import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function useDummy(x) {
  if (typeof x !== "number") {
    throw new Error("x must be a number");
  }

  const [dummy, setDummy] = useState(x);
  return [dummy, setDummy];
}

export default function Counter() {
  let x = useRef(0);
  let [dummy, setDummy] = useDummy(0); // custom hook

  function increment() {
    x.current = x.current + 1;
    setDummy(dummy + 1);
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center  ">
      <Link className="border rounded-xl bg-gray-100 w-50" to="/">
        Back to Home
      </Link>
      <h2 className="text-l">
        Will count how many times the component has been refreshed
      </h2>
      <button
        className="bg-blue-100 rounded-xl p-1  w-50 cursor-pointer border "
        onClick={increment}
      >
        Refresh
      </button>
      <h2 className="text-xl font-bold">{x.current} </h2>
    </div>
  );
}
