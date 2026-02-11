import { Box } from "@mui/material";
import styles from "./BottomBar.module.css";

const BottomBar = ({ children }) => {
  return <Box className={styles.container}>{children}</Box>;
};

export default BottomBar;
