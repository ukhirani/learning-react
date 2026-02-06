import { Button } from "@mui/material";
import styles from "./button.module.css";

const BackwardButton = ({ children, onClick }) => {
  return (
    <Button
      className={styles.forwardButton}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BackwardButton;
