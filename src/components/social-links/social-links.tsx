import { cn } from "../../lib/cn";
import { BrandIcon } from "../brand-icon/brand-icon";
import type { SocialLink } from "../../content/profile";

type SocialLinksProps = {
  className?: string;
  links: readonly SocialLink[];
  showLabel?: boolean;
};

export function SocialLinks({ className, links, showLabel = true }: SocialLinksProps) {
  return (
    <div
      aria-label="Social links"
      className={cn("flex flex-wrap items-center justify-center gap-8", className)}
    >
      {links.map((link) => (
        <a
          aria-label={link.label}
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium text-slate-11 no-underline transition duration-150 ease-out",
            "transition hover:-translate-y-0.5 hover:text-slate-12 focus-visible:-translate-y-px focus-visible:text-slate-12",
          )}
          href={link.href}
          key={link.label}
          rel="noreferrer"
          target="_blank"
        >
          <BrandIcon className="size-5" name={link.icon} />
          {showLabel ? <span>{link.label}</span> : null}
        </a>
      ))}
    </div>
  );
}
