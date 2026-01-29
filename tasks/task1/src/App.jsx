import axios from "axios";
import "./App.css";
import PageOne from "./src/pages/PageOne/PageOne";
import PageTwo from "./src/pages/PageTwo/PageTwo";
import Container from "./src/components/Container";
import { useState } from "react";

function App() {
  const [data, setData] = useState("#000000");

  const setRandomColor = async () => {
    console.log("hello");
    try {
      const response = await axios.get(
        "https://x-colors.yurace.pro/api/random",
      );
      setData(response.data.hex);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container bgColor={data}>
        <PageOne setRandomColor={setRandomColor} />
        <PageTwo color={data} />
      </Container>
    </>
  );
}

export default App;
