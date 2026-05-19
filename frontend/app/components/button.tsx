import type { MouseEventHandler } from "react";

export function Button({
  children,
  type,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  type?: "button" | "reset" | "submit";
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={type ? type : "button"}
      className={`h-fit cursor-pointer rounded-sm px-4 py-2 font-semibold text-neutral-800 transition ${className ?? ""}`}
      onMouseEnter={onMouseEnter ?? (() => {})}
      onMouseLeave={onMouseLeave ?? (() => {})}
    >
      {children}
    </button>
  );
}
