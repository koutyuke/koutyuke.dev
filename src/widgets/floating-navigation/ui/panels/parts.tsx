import { Undo2, X } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, JSX, ReactNode } from "react";

import { cn } from "../../../../shared/lib";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

type PanelItemElement = "a" | "button" | "div";

type PanelItemProps<T extends PanelItemElement> = {
  LeftContent?: ReactNode;
  RightContent?: ReactNode;
} & PolymorphicProps<T>;

export const PanelItem = <T extends PanelItemElement = "div">({
  as,
  children,
  className,
  LeftContent,
  RightContent,
  ...props
}: PanelItemProps<T>) => {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      type={as === "button" ? "button" : undefined}
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-lg border border-transparent px-2 text-start text-base font-medium text-slate-12 transition hover:border-slate-6 hover:bg-slate-4 focus-visible:bg-slate-4 focus-visible:outline-none",
        as === "a" && "cursor-pointer",
        as === "button" && "cursor-pointer",
        className,
      )}
      {...props}
    >
      {LeftContent}
      <span className="flex-1">{children}</span>
      {RightContent}
    </Component>
  );
};

export function PanelSeparator() {
  return <div aria-hidden="true" className="m-1.5 h-px bg-slate-9" />;
}

type PanelFooterActionProps = {
  type: "back" | "close";
  onClick: () => void;
};

export const PanelFooterAction = ({ type, onClick }: PanelFooterActionProps): JSX.Element => {
  const iconClassName = "size-5";
  return (
    <button
      aria-label={type === "back" ? "戻る" : "閉じる"}
      className="pointer-events-auto grid h-10 w-full cursor-pointer place-items-center rounded-lg border border-slate-7 bg-slate-4 text-slate-12 transition hover:bg-slate-5 focus-visible:bg-slate-5 focus-visible:outline-none"
      type="button"
      onClick={onClick}
    >
      {type === "back" ? (
        <Undo2 aria-hidden="true" className={iconClassName} />
      ) : (
        <X aria-hidden="true" className={iconClassName} />
      )}
    </button>
  );
};
