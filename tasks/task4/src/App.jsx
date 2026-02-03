import { useState } from "react";
import React from "react";
import "./App.css";
import { CircularProgress, Button, Typography } from "@mui/material";
import ProductPage from "./pages/ProductPage/page";
import SearchBar from "./components/searchBar";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const filteredDate = data.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="p-4">
      <div className="p-2 flex flex-row justify-between items-center align-items-center">
        <Typography variant="h5">E - Commerce Store</Typography>
        <div className="flex-1">
          <SearchBar setSearch={setSearch} />
        </div>
        <Button
          onClick={() => console.log("view cart clicked")}
          variant="outlined"
          sx={{ height: "40px" }}
        >
          View Cart
        </Button>
      </div>
      {data.length > 0 ? (
        <ProductPage data={filteredDate}></ProductPage>
      ) : (
        <div className="loader text-xl">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
