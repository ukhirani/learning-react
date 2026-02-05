import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import styles from "../../pages/CartPage/page.module.css";

export default function CartTableView({
  items,
  sortBy,
  sortMode,
  setSortBy,
  setSortMode,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
}) {
  return (
    <Box>
      <Box className={styles.tableControlsRow}>
        <FormControl size="small" className={styles.sortDropdown}>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="product">Sort by Product</MenuItem>
            <MenuItem value="price">Sort by Price</MenuItem>
            <MenuItem value="qty">Sort by Quantity</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" className={styles.sortDropdown}>
          <Select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th className={styles.tableActionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const qty = item.quantity;
              return (
                <tr key={item.id}>
                  <td className={styles.tableTitle}>{item.title}</td>
                  <td className={styles.tablePrice}>₹ {item.price}</td>
                  <td className={styles.tableQty}>{qty}</td>
                  <td>
                    <Box className={styles.tableActions}>
                      <Button
                        variant="outlined"
                        size="small"
                        className={styles.qtyBtn}
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className={styles.qtyBtn}
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
