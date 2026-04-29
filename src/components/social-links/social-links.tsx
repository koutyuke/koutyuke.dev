import { links } from "../../content/profile";
import { cn } from "../../lib/cn";
import { GithubIcon, TwitterIcon, ZennIcon } from "../icons";

type SocialLinksProps = {
  className?: string;
  showLabel?: boolean;
};

const socialLinks = [
  {
    href: links.githubAccount,
    icon: GithubIcon,
    label: "GitHub",
  },

  {
    href: links.twitterAccount,
    icon: TwitterIcon,
    label: "Twitter",
  },
  {
    href: links.zennAccount,
    icon: ZennIcon,
    label: "Zenn",
  },
];

export function SocialLinks({ className, showLabel = true }: SocialLinksProps) {
  return (
    <div
      aria-label="Social links"
      className={cn("flex flex-wrap items-center justify-center gap-8", className)}
    >
      {socialLinks.map(({ href, icon: Icon, label }) => {
        return (
          <a
            aria-label={label}
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium text-slate-11 no-underline transition duration-150 ease-out",
              "transition hover:-translate-y-0.5 hover:text-slate-12 focus-visible:-translate-y-px focus-visible:text-slate-12",
            )}
            href={href}
            key={label}
            rel="noreferrer"
            target="_blank"
          >
            <Icon aria-hidden="true" className="size-5" focusable="false" />
            {showLabel ? <span>{label}</span> : null}
          </a>
        );
      })}
    </div>
  );
}
