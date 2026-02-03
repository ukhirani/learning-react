import { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SomeContext } from "../../App.jsx";

export default function Context() {
  let [y, setY] = useContext(SomeContext);

  function incrementContext() {
    setY((y) => y + 1);
  }
  return (
    <div className="flex flex-col gap-3">
      <Link className="border rounded-xl bg-gray-100" to="/">
        Back to Home
      </Link>
      <div className="flex flex-col gap-4">
        <h3>Context Value : {y}</h3>
        <button
          className="bg-yellow-100 rounded-xl border cursor-pointer p-2"
          onClick={incrementContext}
        >
          Increment Context
        </button>
      </div>
    </div>
  );
}
