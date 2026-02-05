import { Box, Button } from "@mui/material";
import styles from "../../pages/CartPage/page.module.css";

export default function CartCardView({
  items,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
}) {
  return (
    <Box className={styles.list}>
      {items.map((item) => {
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
      })}
    </Box>
  );
}
