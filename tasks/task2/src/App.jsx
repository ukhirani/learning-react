import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Counter from "./pages/Counter/Counter.jsx";
import Context from "./pages/Context/Context.jsx";
import { createContext, useState } from "react";
import Callback from "../src/pages/Callback/Callback";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/counter", element: <Counter /> },
  { path: "/context", element: <Context /> },
  { path: "/callback", element: <Callback /> },
]);

let x = createContext();
export const SomeContext = x;

function App() {
  const [count, setCount] = useState(0);

  return (
    <x.Provider value={[count, setCount]}>
      <RouterProvider router={router} />
    </x.Provider>
  );
}

export default App;
