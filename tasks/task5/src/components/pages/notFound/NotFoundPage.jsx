import { Container, Typography, Box } from "@mui/material";
import styles from "./notfound.module.css";

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Box className={styles.container}>
        <Typography variant="h1" className={styles.message}>
          404
        </Typography>
        <Typography variant="h3" className={styles.message}>
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
}
