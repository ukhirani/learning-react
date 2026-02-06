import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./button.module.css";

const forwardButton = ({ children, onClick }) => {
  return (
    <Button
      className={styles.forwardButton}
      variant="contained"
      onClick={onClick}
      endIcon={<ArrowForwardIcon />}
    >
      {children}
    </Button>
  );
};

export default forwardButton;
