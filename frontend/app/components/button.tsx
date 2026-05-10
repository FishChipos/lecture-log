export function Button({ children, type, className }: {
    children: React.ReactNode;
    type?: "button" | "reset" | "submit";
    className?: string;
}) {
    return (
        <button 
            type={type ? type : "button"}
            className={`px-4 py-2 cursor-pointer transition rounded-sm ${className ? className : ""}`}>
            {children}
        </button>
    )
}
