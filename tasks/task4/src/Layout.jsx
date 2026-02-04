import { CircularProgress, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useProducts } from "./context/ProductsContext";
import ProductPage from "./pages/ProductPage/page";
import styles from "./App.module.css";
import NotFoundPage from "./pages/NotFoundPage/page";

export default function Layout() {
  const { search } = useOutletContext();
  const { products, loading, error } = useProducts();

  const filteredData = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  if (error) {
    console.error("Error fetching PRODUCTS:", error);
    return <NotFoundPage>Error fetching products</NotFoundPage>;
  }

  if (loading) {
    return (
      <Box className={styles.loaderBox}>
        <CircularProgress />
      </Box>
    );
  }

  return <ProductPage data={filteredData} />;
}
