import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import styles from "./page.module.css";

export default function NotFoundPage({ children }) {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <Typography variant="h1" className={styles.errorCode}>
        404
      </Typography>
      <Typography variant="h4" className={styles.title}>
        {children}
      </Typography>
      <Box className={styles.actions}>
        <Button
          variant="contained"
          className={styles.homeButton}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
}
