#!/usr/bin/env bash
set -euo pipefail

# environment variables
# - CF_API_TOKEN
# - CF_ACCOUNT_ID
# - CF_PAGES_PROJECT_NAME
# - CLEANUP_MODE:
#   - pr-closed: cleanup PR previews
#   - post-production: cleanup previews after production deploy
# - PR_BRANCH: PR head branch for pr-closed mode
# - PRODUCTION_BRANCH: production branch
# - PRODUCTION_ALIAS: production alias

api_base="https://api.cloudflare.com/client/v4"
cleanup_mode="${CLEANUP_MODE:-pr-closed}"
pr_branch="${PR_BRANCH:-}"
production_branch="${PRODUCTION_BRANCH:-main}"
production_alias="${PRODUCTION_ALIAS:-https://koutyuke.dev}"

deployments_jsonl=""

required_envs=(
  CF_API_TOKEN
  CF_ACCOUNT_ID
  CF_PAGES_PROJECT_NAME
)
for env_name in "${required_envs[@]}"; do
  if [[ -z "${!env_name:-}" ]]; then
    echo "error: ${env_name} is required" >&2
    exit 1
  fi
done

cleanup() {
  if [[ -n "${deployments_jsonl:-}" ]]; then
    rm -f "${deployments_jsonl}"
  fi
}

validate_mode() {
  case "${cleanup_mode}" in
  pr-closed | post-production) ;;
  *)
    echo "error: unsupported CLEANUP_MODE: ${cleanup_mode}" >&2
    exit 1
    ;;
  esac

  if [[ "${cleanup_mode}" == "pr-closed" && -z "${pr_branch}" ]]; then
    echo "error: CLEANUP_PR_BRANCH is required for pr-closed mode" >&2
    exit 1
  fi

  if [[ "${cleanup_mode}" == "post-production" && -z "${production_branch}" ]]; then
    echo "error: PRODUCTION_BRANCH is required for post-production mode" >&2
    exit 1
  fi

  if [[ "${cleanup_mode}" == "post-production" && -z "${production_alias}" ]]; then
    echo "error: PRODUCTION_ALIAS is required for post-production mode" >&2
    exit 1
  fi
}

fetch_deployments() {
  local output="${1}"
  local page=1
  local per_page=25

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
    success="$(jq -r '.success' <<<"${response}")"
    if [[ "${success}" != "true" ]]; then
      echo "error: Cloudflare API request failed" >&2
      jq '.errors' <<<"${response}" >&2
      exit 1
    fi

    jq -c '
    .result[]
    | {
        id: (.id // null),
        environment: (.environment // null),
        branch: (.deployment_trigger.metadata.branch // null),
        commit: (.deployment_trigger.metadata.commit_hash // null),
        url: (.url // null),
        aliases: (.aliases // []),
        created_on: (.created_on // null)
      }
  ' <<<"${response}" >>"${output}"

    local total_pages
    total_pages="$(jq -r '.result_info.total_pages // 1' <<<"${response}")"
    if ((page >= total_pages)); then
      break
    fi

    page=$((page + 1))
  done
}

delete_deployment() {
  local deployment_id="${1}"

  curl --fail-with-body --silent --show-error \
    --request DELETE \
    --url "${api_base}/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PAGES_PROJECT_NAME}/deployments/${deployment_id}?force=true" \
    --header "Authorization: Bearer ${CF_API_TOKEN}" \
    --header "Content-Type: application/json" >/dev/null
}

main() {
  validate_mode

  deployments_jsonl="$(mktemp)"

  trap cleanup EXIT

  fetch_deployments "${deployments_jsonl}"

  while IFS= read -r deployment; do
    [[ -z "${deployment}" ]] && continue

    local deployment_id
    deployment_id="$(jq -r '.id' <<<"${deployment}")"
    local environment
    environment="$(jq -r '.environment' <<<"${deployment}")"
    local branch
    branch="$(jq -r '.branch' <<<"${deployment}")"

    if [[ "${cleanup_mode}" == "pr-closed" ]]; then

      if [[ "${environment}" != "preview" ]]; then
        continue
      fi

      if [[ "${branch}" != "${pr_branch}" ]]; then
        continue
      fi

      delete_deployment "${deployment_id}"

      continue
    elif [[ "${cleanup_mode}" == "post-production" ]]; then

      if [[ "${environment}" != "production" ]]; then
        continue
      fi

      if [[ "${branch}" != "${production_branch}" ]]; then
        continue
      fi

      local has_production_alias=false
      local alias
      while IFS= read -r alias; do
        if [[ "${alias}" == "${production_alias}" ]]; then
          has_production_alias=true
          break
        fi
      done < <(jq -r '.aliases[]?' <<<"${deployment}")

      if [[ "${has_production_alias}" != "true" ]]; then
        delete_deployment "${deployment_id}"
      fi

      continue
    fi
  done <"${deployments_jsonl}"
}

main "$@"
