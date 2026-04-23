import asteriskIcon from "../../assets/icons/asterisk.svg?raw";
import figmaIcon from "../../assets/icons/figma.svg?raw";
import githubIcon from "../../assets/icons/github.svg?raw";
import koutyukeIcon from "../../assets/icons/koutyuke.svg?raw";
import twitterIcon from "../../assets/icons/twitter.svg?raw";
import zennIcon from "../../assets/icons/zenn.svg?raw";
import { cn } from "../../lib/cn";

export type BrandIconName = "asterisk" | "figma" | "github" | "koutyuke" | "twitter" | "zenn";

const icons = {
  asterisk: asteriskIcon,
  figma: figmaIcon,
  github: githubIcon,
  koutyuke: koutyukeIcon,
  twitter: twitterIcon,
  zenn: zennIcon,
} satisfies Record<BrandIconName, string>;

type BrandIconProps = {
  className?: string;
  name: BrandIconName;
};

export function BrandIcon({ className, name }: BrandIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("brand-icon inline-flex shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
