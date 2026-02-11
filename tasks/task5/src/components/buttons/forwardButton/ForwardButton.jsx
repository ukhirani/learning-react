import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./button.module.css";

const forwardButton = ({
  children,
  onClick,
  color = "primary",
  noIcon = false,
}) => {
  return (
    <Button
      className={styles.forwardButton}
      variant="contained"
      onClick={onClick}
      endIcon={noIcon ? null : <ArrowForwardIcon />}
      color={color}
    >
      {children}
    </Button>
  );
};

export default forwardButton;
