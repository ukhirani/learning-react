import axios from "axios";
import "./App.css";

import PageOne from "./src/pages/PageOne/PageOne";
import PageTwo from "./src/pages/PageTwo/PageTwo";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState("#000000");

  function setRandomColor() {
    console.log("hello");
    axios.get("https://x-colors.yurace.pro/api/random").then((response) => {
      setData(response.data.hex);
    });
  }

  useEffect(() => {
    console.log("from Use Effect" + data);
    document.body.style.backgroundColor = data;
  }, [data]);

  return (
    <>
      <PageOne SetRandomColor={setRandomColor} />{" "}
      <PageTwo color={data}></PageTwo>
    </>
  );
}

export default App;
