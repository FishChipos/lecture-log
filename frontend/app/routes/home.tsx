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
    <div className="flex grow flex-col items-center justify-center gap-8 text-center text-neutral-800">
      <p className="text-5xl font-bold">
        Academic Tracking,
        <br />
        <span className="text-yellow-500">Reimagined</span>
      </p>
      <p className="text-neutral-600">
        Keep up with your studies, now easier than ever.
      </p>
      <Link to="/auth/register" viewTransition>
        <Button
          className="bg-yellow-400 text-xl outline-2 outline-yellow-400 hover:bg-yellow-500 hover:text-white hover:outline-yellow-500"
          onMouseEnter={arrowAppear}
          onMouseLeave={arrowDisappear}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
