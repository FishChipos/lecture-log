import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/button";

export function loader() {}

export default function Home() {
  const [displayArrow, setDisplayArrow] = useState(false);

  function arrowAppear() {
    setDisplayArrow(true);
  }

  function arrowDisappear() {
    setDisplayArrow(false);
  }

  return (
    <div className="flex flex-col grow justify-center items-center text-center gap-8 text-neutral-800">
      <p className="text-5xl font-bold">
        Academic Tracking,
        <br />
        <span className="text-yellow-500">Reimagined</span>
      </p>
      <p className="text-neutral-600">
        Keep up with your studies, now easier than ever.
      </p>
      <Link to="/auth/register">
        <Button
          className="text-xl outline-2 bg-yellow-400 outline-yellow-400 hover:bg-yellow-500 hover:outline-yellow-500"
          onMouseEnter={arrowAppear}
          onMouseLeave={arrowDisappear}
        >
          Get Started {displayArrow ? <>&rarr;</> : ""}
        </Button>
      </Link>
    </div>
  );
}
