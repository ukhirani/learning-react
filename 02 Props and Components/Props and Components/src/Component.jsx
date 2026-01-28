import { use, useState } from "react";
import MyButton from "./myButton";

import axios from "axios";

export default function Component({ name, children }) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const incrementCount = () => {
    setCount(count + 1);
    axios.get("https://fakestoreapi.com/users").then((response) => {
      setData(response.data);
    });
  };

  const toBeRendered = data.map((item) => {
    console.log(item);
    return <button key={item.id}> {item.username}</button>;
  });

  return (
    <>
      {data.length === 0 ? (
        <MyButton count={count} incrementCount={incrementCount} />
      ) : (
        toBeRendered
      )}
    </>
  );
}
