import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import styles from "./page.module.css";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } =
    useCart();

  if (loading) {
    return (
      <Box className={styles.loaderBox}>
        <CircularProgress />
      </Box>
    );
  }

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const quantity = getQuantity(product.id);

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Box className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
        </Box>

        <Box className={styles.detailsSection}>
          <Typography variant="caption" className={styles.category}>
            {product.category}
          </Typography>

          <Typography variant="h4" className={styles.title}>
            {product.title}
          </Typography>

          <Box className={styles.ratingRow}>
            <Star className={styles.starIcon} />
            <Typography variant="body2" className={styles.ratingText}>
              {product.rating?.rate || 4.5} ({product.rating?.count || 121}{" "}
              reviews)
            </Typography>
          </Box>

          <Typography variant="h4" className={styles.price}>
            ₹{Math.round(product.price)}
          </Typography>

          <Typography variant="body1" className={styles.description}>
            {product.description}
          </Typography>

          <Box className={styles.actionSection}>
            {quantity === 0 ? (
              <Button
                variant="contained"
                className={styles.addButton}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            ) : (
              <Box className={styles.quantityControls}>
                <Button
                  variant="outlined"
                  className={styles.qtyBtn}
                  onClick={() => decreaseQuantity(product.id)}
                  aria-label="Decrease quantity"
                >
                  −
                </Button>
                <span className={styles.qtyValue}>{quantity}</span>
                <Button
                  variant="outlined"
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
      </Box>
    </Box>
  );
}
