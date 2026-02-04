import { useNavigate } from "react-router-dom";
import { Card, Typography, Box, Button } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import styles from "./productCard.module.css";

export function ProductCard({ product }) {
  const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } =
    useCart();
  const navigate = useNavigate();

  const quantity = getQuantity(product.id);

  const handleCardClick = (e) => {
    if (e.target.closest("button")) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className={styles.card} variant="outlined" onClick={handleCardClick}>
      <Box
        className={styles.imageWrapper}
        component="img"
        alt={product.title}
        src={product.image}
      />

      <Box className={styles.details}>
        <Typography className={styles.title} variant="body2">
          {product.title}
        </Typography>

        <Box className={styles.categoryRatingRow}>
          <Typography variant="caption" className={styles.category}>
            {product.category}
          </Typography>

          <Box className={styles.ratingRow}>
            <Star className={styles.starIcon} />
            <Typography variant="caption" className={styles.ratingText}>
              {product.rating?.rate || 4.5} ({product.rating?.count || 121})
            </Typography>
          </Box>
        </Box>

        <Box className={styles.priceRow}>
          <Typography variant="h6" className={styles.price}>
            ₹{Math.round(product.price)}
          </Typography>
        </Box>

        <Box className={styles.quantityRow}>
          {quantity === 0 ? (
            <Button
              variant="contained"
              className={styles.addButton}
              onClick={() => addToCart(product)}
              fullWidth
            >
              Add to Cart
            </Button>
          ) : (
            <Box className={styles.quantityControls}>
              <Button
                variant="outlined"
                size="small"
                className={styles.qtyBtn}
                onClick={() => decreaseQuantity(product.id)}
                aria-label="Decrease quantity"
              >
                −
              </Button>
              <span className={styles.qtyValue}>{quantity}</span>
              <Button
                variant="outlined"
                size="small"
                className={styles.qtyBtn}
                onClick={() => increaseQuantity(product.id)}
                aria-label="Increase quantity"
              >
                +
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
