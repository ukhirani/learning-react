import { Box } from "@mui/material";
import styles from "./formStep.module.css";

const formStep = ({ children }) => {
  return <Box className={styles.container}>{children}</Box>;
};

export default formStep;
