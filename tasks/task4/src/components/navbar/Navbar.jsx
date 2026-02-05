import { useNavigate, useLocation } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Badge,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import SearchBar from "../searchBar/searchBar";
import styles from "./Navbar.module.css";

export default function Navbar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  const { cartItems } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  const uniqueItemsCount = cartItems.length;

  const categories = [...new Set(products.map((p) => p.category))].sort();

  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isCartPage = location.pathname === "/cart";
  const isHomePage = location.pathname === "/";

  return (
    <Box className={styles.header}>
      <Typography variant="h5" className={styles.logo}>
        E - Commerce Store
      </Typography>

      {!isProductDetailPage && (
        <Box className={styles.searchWrapper}>
          <SearchBar setSearch={setSearch} />
        </Box>
      )}

      {isHomePage && (
        <FormControl size="small" className={styles.categorySelect}>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box className={styles.headerActions}>
        {isCartPage || isProductDetailPage ? (
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            className={styles.backButton}
          >
            Back to Home
          </Button>
        ) : null}

        {!isCartPage && (
          <Badge
            badgeContent={uniqueItemsCount}
            color="error"
            className={styles.badge}
          >
            <Button
              onClick={() => navigate("/cart")}
              variant="contained"
              className={styles.cartButton}
            >
              Cart
            </Button>
          </Badge>
        )}
      </Box>
    </Box>
  );
}
