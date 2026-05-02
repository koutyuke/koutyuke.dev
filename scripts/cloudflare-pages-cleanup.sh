#!/usr/bin/env bash
set -euo pipefail

api_base="https://api.cloudflare.com/client/v4"
cleanup_mode="${CLEANUP_MODE:-full-scan}"
dry_run="${CLEANUP_DRY_RUN:-true}"
delete_alias_deployments="${CLEANUP_DELETE_ALIAS_DEPLOYMENTS:-false}"
per_page="${CF_PAGES_DEPLOYMENTS_PER_PAGE:-25}"
production_branch="${CF_PAGES_PRODUCTION_BRANCH:-main}"
pr_branch="${CLEANUP_PR_BRANCH:-}"
pr_sha="${CLEANUP_PR_SHA:-}"
fixture="${CF_PAGES_DEPLOYMENTS_FIXTURE:-}"
deployments_jsonl=""
rows_tsv=""

cleanup() {
  rm -f "${deployments_jsonl}" "${rows_tsv}"
}

require_env() {
  local env_name="${1}"

  if [[ -z "${!env_name:-}" ]]; then
    echo "error: ${env_name} is required" >&2
    exit 1
  fi
}

is_true() {
  [[ "${1}" == "true" || "${1}" == "1" || "${1}" == "yes" ]]
}

validate_mode() {
  case "${cleanup_mode}" in
    full-scan | post-production | pr-closed)
      ;;
    *)
      echo "error: unsupported CLEANUP_MODE: ${cleanup_mode}" >&2
      exit 1
      ;;
  esac

  if [[ "${cleanup_mode}" == "pr-closed" && -z "${pr_branch}" && -z "${pr_sha}" ]]; then
    echo "error: CLEANUP_PR_BRANCH or CLEANUP_PR_SHA is required for pr-closed mode" >&2
    exit 1
  fi
}

fetch_deployments() {
  local output="${1}"
  local page=1

  if [[ -n "${fixture}" ]]; then
    jq -c '.result[]' "${fixture}" > "${output}"
    return
  fi

  require_env CF_API_TOKEN
  require_env CF_ACCOUNT_ID
  require_env CF_PAGES_PROJECT_NAME

  while :; do
    local response
    response="$(
      curl --fail-with-body --silent --show-error \
        --request GET \
        --url "${api_base}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_NAME}/deployments?page=${page}&per_page=${per_page}" \
        --header "Authorization: Bearer ${CF_API_TOKEN}" \
        --header "Content-Type: application/json"
    )"

    local success
    success="$(jq -r '.success' <<< "${response}")"
    if [[ "${success}" != "true" ]]; then
      echo "error: Cloudflare API request failed" >&2
      jq '.errors' <<< "${response}" >&2
      exit 1
    fi

    jq -c '.result[]' <<< "${response}" >> "${output}"

    local total_pages
    total_pages="$(jq -r '.result_info.total_pages // 1' <<< "${response}")"
    if (( page >= total_pages )); then
      break
    fi

    page=$((page + 1))
  done
}

decision_for() {
  local deployment="${1}"

  jq -r \
    --arg mode "${cleanup_mode}" \
    --arg production_branch "${production_branch}" \
    --arg pr_branch "${pr_branch}" \
    --arg pr_sha "${pr_sha}" \
    --arg delete_alias_deployments "${delete_alias_deployments}" '
      def field($path): getpath($path) // "";
      def has_alias: ((.aliases // []) | length) > 0;

      if (.id // "") == "" then
        "skip: unknown-shape"
      elif (.environment // "") != "preview" then
        "skip: production"
      elif field(["deployment_trigger", "metadata", "branch"]) == $production_branch then
        "skip: production-branch"
      elif has_alias and $delete_alias_deployments != "true" then
        "skip: alias"
      elif $mode == "pr-closed" then
        if ($pr_branch != "" and field(["deployment_trigger", "metadata", "branch"]) == $pr_branch) then
          "delete"
        elif ($pr_sha != "" and field(["deployment_trigger", "metadata", "commit_hash"]) == $pr_sha) then
          "delete"
        else
          "skip: pr-mismatch"
        end
      else
        "delete"
      end
    ' <<< "${deployment}"
}

print_row() {
  local decision="${1}"
  local deployment="${2}"

  jq -r --arg decision "${decision}" '
    [
      $decision,
      (.id // "-"),
      (.environment // "-"),
      (.deployment_trigger.metadata.branch // "-"),
      ((.deployment_trigger.metadata.commit_hash // "-") | if . == "-" then . else .[0:12] end),
      (((.aliases // []) | length) | tostring),
      (.url // "-"),
      (.created_on // "-")
    ]
    | @tsv
  ' <<< "${deployment}"
}

delete_deployment() {
  local deployment_id="${1}"

  require_env CF_API_TOKEN
  require_env CF_ACCOUNT_ID
  require_env CF_PAGES_PROJECT_NAME

  curl --fail-with-body --silent --show-error \
    --request DELETE \
    --url "${api_base}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_NAME}/deployments/${deployment_id}" \
    --header "Authorization: Bearer ${CF_API_TOKEN}" \
    --header "Content-Type: application/json" >/dev/null
}

main() {
  validate_mode

  deployments_jsonl="$(mktemp)"
  rows_tsv="$(mktemp)"
  trap cleanup EXIT

  fetch_deployments "${deployments_jsonl}"

  local delete_count=0
  local failure_count=0

  while IFS= read -r deployment; do
    local decision
    local deployment_id
    decision="$(decision_for "${deployment}")"
    deployment_id="$(jq -r '.id // ""' <<< "${deployment}")"

    print_row "${decision}" "${deployment}" >> "${rows_tsv}"

    if [[ "${decision}" != "delete" ]]; then
      continue
    fi

    delete_count=$((delete_count + 1))

    if is_true "${dry_run}"; then
      continue
    fi

    if ! delete_deployment "${deployment_id}"; then
      echo "error: failed to delete deployment ${deployment_id}" >&2
      failure_count=$((failure_count + 1))
    fi
  done < "${deployments_jsonl}"

  {
    printf "%-20s %-38s %-12s %-32s %-14s %-7s %-58s %s\n" \
      "decision" "id" "environment" "branch" "commit" "aliases" "url" "created_on"
    awk -F '\t' '{
      printf "%-20s %-38s %-12s %-32s %-14s %-7s %-58s %s\n", $1, $2, $3, $4, $5, $6, $7, $8
    }' "${rows_tsv}"
  }

  if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
    {
      echo "## Cloudflare Pages deployment cleanup"
      echo
      echo "- mode: \`${cleanup_mode}\`"
      echo "- dry-run: \`${dry_run}\`"
      echo "- delete alias deployments: \`${delete_alias_deployments}\`"
      echo "- delete candidates: \`${delete_count}\`"
      echo
      echo "| decision | id | environment | branch | commit | aliases | url | created_on |"
      echo "| --- | --- | --- | --- | --- | ---: | --- | --- |"
      while IFS=$'\t' read -r decision id environment branch commit aliases url created_on; do
        echo "| ${decision} | ${id} | ${environment} | ${branch} | ${commit} | ${aliases} | ${url} | ${created_on} |"
      done < "${rows_tsv}"
    } >> "${GITHUB_STEP_SUMMARY}"
  fi

  if (( failure_count > 0 )); then
    echo "error: ${failure_count} deployment deletion(s) failed" >&2
    exit 1
  fi
}

main "$@"
