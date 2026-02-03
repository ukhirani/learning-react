import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import CartPage from "./pages/CartPage/page";
import styles from "./CartLayout.module.css";

export default function CartLayout() {
  const navigate = useNavigate();

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          className={styles.backButton}
          sx={{
            borderRadius: "8px",
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              borderColor: "#16a34a",
              color: "#16a34a",
              backgroundColor: "transparent",
            },
          }}
        >
          Back
        </Button>
      </Box>
      <CartPage />
    </Box>
  );
}
