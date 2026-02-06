import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./button.module.css";

const BackwardButton = ({ children, onClick }) => {
  return (
    <Button
      className={styles.forwardButton}
      variant="contained"
      onClick={onClick}
      startIcon={<ArrowBackIcon />}
    >
      {children}
    </Button>
  );
};

export default BackwardButton;
