import { cn } from "../../lib";

type SectionDividerProps = {
  className?: string;
};

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-[repeating-linear-gradient(90deg,var(--slate-8)_0_8px,transparent_8px_16px)]",
        className,
      )}
    />
  );
}
