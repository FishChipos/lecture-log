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
      className="grow rounded-sm bg-white px-4 py-2 outline-2 outline-yellow-400 focus:outline-neutral-800"
    />
  );
}
