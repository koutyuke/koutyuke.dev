import { cn } from "../../lib";

type TagListProps = {
  className?: string;
  tags: readonly string[];
};

export function TagList({ className, tags }: TagListProps) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-2 p-0", className)}>
      {tags.map((tag) => (
        <li
          className="rounded border border-slate-6 bg-slate-3 px-2.5 py-1 text-xs leading-normal font-medium text-slate-11"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
