import { Box } from "@mui/material";
import { ProductCard } from "../../components/productCard/productCard";
import styles from "./page.module.css";

export default function ProductPage({ data = [] }) {
  if (data.length === 0) {
    return (
      <Box className={styles.emptyBox}>
        <Box className={styles.empty}>No products found.</Box>
      </Box>
    );
  }

  const content = data.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return <Box className={styles.container}>{content}</Box>;
}
