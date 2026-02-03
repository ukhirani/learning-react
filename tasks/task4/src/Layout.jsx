import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import { useProducts } from "./context/ProductsContext";
import { useCart } from "./context/CartContext";
import SearchBar from "./components/searchBar/searchBar";
import ProductPage from "./pages/ProductPage/page";
import styles from "./App.module.css";

export default function Layout() {
  const [search, setSearch] = useState("");
  const { products, loading } = useProducts();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const uniqueItemsCount = cartItems.length;

  const filteredData = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Typography variant="h5">E - Commerce Store</Typography>
        <Box className={styles.searchWrapper}>
          <SearchBar setSearch={setSearch} />
        </Box>
        <Box className={styles.headerActions}>
          <Badge
            badgeContent={uniqueItemsCount}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                right: -3,
                top: 3,
                border: "2px solid white",
                padding: "0 4px",
              },
            }}
          >
            <Button
              onClick={() => navigate("/cart")}
              variant="contained"
              sx={{
                height: "40px",
                boxShadow: "none",
                borderRadius: "10px",
                backgroundColor: "#16a34a",
                "&:hover": {
                  backgroundColor: "#15803d",
                  boxShadow: "none",
                },
              }}
            >
              Cart
            </Button>
          </Badge>
        </Box>
      </Box>
      {loading ? (
        <Box className={styles.loaderBox}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductPage data={filteredData} />
      )}
    </Box>
  );
}
