export function TextField({
    placeholder,
    name,
}: {
    placeholder: string;
    name: string;
}) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="grow px-4 py-2 rounded-sm outline-2 outline-yellow-400 bg-white focus:outline-neutral-800"
        />
    );
}
