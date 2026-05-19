import { useState } from "react";

export function ClassCard({
  name,
  imageSrc,
  imageAlt,
}: {
  name: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex size-full flex-col gap-4 outline-2 outline-yellow-400 transition ${hovered ? "bg-white" : "bg-yellow-400"}`}
    >
      <div className="flex items-center p-4">
        <div className="line-clamp-1 grow font-bold">{name}</div>
        <div className="group flex size-7 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[50%] bg-white transition hover:bg-yellow-500">
          <div className="size-0.75 rounded-[50%] bg-neutral-800 transition group-hover:bg-white"></div>
          <div className="size-0.75 rounded-[50%] bg-neutral-800 transition group-hover:bg-white"></div>
          <div className="size-0.75 rounded-[50%] bg-neutral-800 transition group-hover:bg-white"></div>
        </div>
      </div>
      <div
        className={"flex size-full cursor-pointer flex-col px-4 pb-4"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={imageSrc} alt={imageAlt} className="aspect-2/1 w-full" />
        <div className="w-full text-right">
          <span
            className={`transition ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
