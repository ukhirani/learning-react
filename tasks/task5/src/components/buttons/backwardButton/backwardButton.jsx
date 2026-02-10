import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./button.module.css";

const BackwardButton = ({
  color = "primary",
  children,
  onClick,
  icon = <ArrowBackIcon />,
}) => {
  return (
    <Button
      className={styles.forwardButton}
      variant="contained"
      color={color}
      onClick={onClick}
      startIcon={icon}
    >
      {children}
    </Button>
  );
};

export default BackwardButton;
