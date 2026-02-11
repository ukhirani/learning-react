import { Box } from "@mui/material";
import StepperComponent from "../../stepper/StepperComponent";
import CustomRouter from "../../CustomRouter";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <Box className={styles.container}>
      <StepperComponent />
      <CustomRouter />
    </Box>
  );
};

export default HomePage;
