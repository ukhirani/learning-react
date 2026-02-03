import { Typography, Button, Box } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./page.module.css";

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <Box className={styles.container}>
        <Typography variant="h5" className={styles.title}>
          Your Cart
        </Typography>
        <p className={styles.empty}>Your cart is empty.</p>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Your Cart
      </Typography>
      <Box className={styles.list}>
        {cartItems.map((item) => {
          const qty = item.quantity ?? 1;
          return (
            <Box key={item.id} className={styles.item}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
              />
              <Box className={styles.itemDetails}>
                <Box className={styles.itemTitle}>{item.title}</Box>
                <Box className={styles.itemPrice}>₹ {item.price}</Box>
                <Box className={styles.quantityRow}>
                  <Button
                    variant="outlined"
                    size="small"
                    className={styles.qtyBtn}
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                    sx={{
                      borderRadius: "6px",
                      borderColor: "#d1d5db",
                      color: "#374151",
                      minWidth: "32px",
                      width: "32px",
                      height: "32px",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    -
                  </Button>
                  <span className={styles.qtyValue}>{qty}</span>
                  <Button
                    variant="outlined"
                    size="small"
                    className={styles.qtyBtn}
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                    sx={{
                      borderRadius: "6px",
                      borderColor: "#d1d5db",
                      color: "#374151",
                      minWidth: "32px",
                      width: "32px",
                      height: "32px",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>
              <Box className={styles.remove}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: "#fef2f2",
                    },
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
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
    </Box>
  );
}
