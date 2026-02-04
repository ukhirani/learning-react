import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Box, Button, Badge } from "@mui/material";
import { useCart } from "../../context/CartContext";
import SearchBar from "../searchBar/searchBar";
import styles from "./Navbar.module.css";

export default function Navbar({ search, setSearch }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const uniqueItemsCount = cartItems.length;

  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isCartPage = location.pathname === "/cart";

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
