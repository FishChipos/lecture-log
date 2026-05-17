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
            className={`h-fit font-semibold text-neutral-800 px-4 py-2 cursor-pointer transition rounded-sm ${className ?? ""}`}
            onMouseEnter={onMouseEnter ?? (() => {})}
            onMouseLeave={onMouseLeave ?? (() => {})}
        >
            {children}
        </button>
    );
}
