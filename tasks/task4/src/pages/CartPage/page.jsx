import { Typography, Button, Box } from "@mui/material";
import { useCart } from "../../context/CartContext";
import styles from "./page.module.css";
import { useOutletContext } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { search } = useOutletContext();

  const filteredCartItems = cartItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Your Cart
      </Typography>
      <Box className={styles.list}>
        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : filteredCartItems.length === 0 ? (
          <p className={styles.empty}>No items match your search "{search}"</p>
        ) : (
          filteredCartItems.map((item) => {
            const qty = item.quantity;
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
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
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
