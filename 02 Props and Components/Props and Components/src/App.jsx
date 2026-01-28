import { use, useEffect, useRef, useState } from "react";
import "./App.css";
import Component from "./Component";

function App() {
  const [count, setCount] = useState(1);
  let countRef = useRef(1);

  const incrementState = () => {
    setCount(count + 1);
  };

  const incrementCountRef = () => {
    countRef.current += 1;
  };

  useEffect(() => {
    console.log("use effect called");
  }, [countRef.current, count]);

  return (
    <>
      <Component name={"Umang" + count}>
        <div>OK!!</div>
      </Component>
      <div></div>
      <Component name={"Hirani" + countRef.current}></Component>
      <div></div>
    </>
  );
}

export default App;
