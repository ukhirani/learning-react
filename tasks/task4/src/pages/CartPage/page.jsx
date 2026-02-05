import { Typography, Box, Tabs, Tab } from "@mui/material";
import { useCart } from "../../context/CartContext";
import styles from "./page.module.css";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CartCardView from "../../components/cartPage/CartCardView";
import CartTableView from "../../components/cartPage/CartTableView";

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { search } = useOutletContext();
  const [viewMode, setViewMode] = useState("card");
  const [sortBy, setSortBy] = useState("product");
  const [sortMode, setSortMode] = useState("asc");

  const filteredCartItems = cartItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedItems = [...filteredCartItems].sort((a, b) => {
    let compareA = a;
    let compareB = b;

    switch (sortBy) {
      case "price":
        compareA = a.price;
        compareB = b.price;
        break;
      case "qty":
        compareA = a.quantity;
        compareB = b.quantity;
        break;
      case "product":
      default:
        compareA = a.title.toLowerCase();
        compareB = b.title.toLowerCase();
    }

    if (sortMode === "asc") {
      if (compareA < compareB) return -1;
      if (compareA > compareB) return 1;
    } else {
      if (compareA > compareB) return -1;
      if (compareA < compareB) return 1;
    }
    return 0;
  });

  const handleViewChange = (event, newValue) => {
    setViewMode(newValue);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.headerRow}>
        <Typography variant="h5" className={styles.title}>
          Your Cart
        </Typography>
        <Tabs value={viewMode} onChange={handleViewChange}>
          <Tab label="Card View" value="card" />
          <Tab label="Table View" value="table" />
        </Tabs>
      </Box>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : filteredCartItems.length === 0 ? (
        <p className={styles.empty}>No items match your search "{search}"</p>
      ) : viewMode === "table" ? (
        <CartTableView
          items={sortedItems}
          sortBy={sortBy}
          sortMode={sortMode}
          setSortBy={setSortBy}
          setSortMode={setSortMode}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          removeFromCart={removeFromCart}
        />
      ) : (
        <CartCardView
          items={filteredCartItems}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          removeFromCart={removeFromCart}
        />
      )}
      {cartItems.length > 0 && (
        <Box className={styles.totalSection}>
          <Typography variant="h6" className={styles.totalLabel}>
            Cart Total
          </Typography>
          <Typography variant="h5" className={styles.totalAmount}>
            ₹{" "}
            {cartItems
              .reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0) // here 0 is the initial value for sum
              .toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
