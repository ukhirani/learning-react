import "./App.css";
import CustomRouter from "./components/CustomRouter.jsx";
import styles from "./app.module.css";
import { Box } from "@mui/material";
import FormContextProvider from "./context/FormContext.jsx";
import StepperComponent from "./components/stepper/stepperComponent.jsx";
import SuccessModal from "./components/successModal/SuccessModal.jsx";

function App() {
  return (
    <>
      <Box className={styles.container}>
        <FormContextProvider>
          <StepperComponent />
          <CustomRouter />
          <SuccessModal />
        </FormContextProvider>
      </Box>
    </>
  );
}

export default App;
