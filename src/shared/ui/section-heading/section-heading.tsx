import { cn } from "../../lib";

type SectionHeadingProps = {
  align?: "center" | "start";
  eyebrow?: string;
  id: string;
  title: string;
};

export function SectionHeading({ align = "start", eyebrow, id, title }: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-1 pb-6", align === "center" ? "text-center" : "text-start")}>
      <h2 className="m-0 font-handwritten text-4xl leading-[1.05] text-slate-12" id={id}>
        {title}
      </h2>
      {eyebrow ? <p className="m-0 text-xs font-medium text-slate-10">{eyebrow}</p> : null}
    </header>
  );
}
