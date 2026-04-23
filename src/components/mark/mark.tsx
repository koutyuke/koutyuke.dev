import { cn } from "../../lib/cn";

type MarkTone = "red" | "teal" | "yellow";

type MarkProps = {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  tone?: MarkTone;
  wide?: boolean;
};

const toneClassName = {
  red: "after:bg-red-5",
  teal: "after:bg-teal-4",
  yellow: "after:bg-yellow-4",
} satisfies Record<MarkTone, string>;

export function Mark({
  children,
  className,
  strong = false,
  tone = "teal",
  wide = false,
}: MarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex text-slate-12 after:absolute after:inset-x-0 after:bottom-[0.08em] after:-z-10 after:h-[0.5em] after:rounded-full after:content-['']",
        toneClassName[tone],
        strong && "font-semibold",
        wide && "px-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}
