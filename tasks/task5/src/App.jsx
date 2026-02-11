import "./App.css";
import CustomRouter from "./components/CustomRouter.jsx";
import styles from "./app.module.css";
import { Box } from "@mui/material";
import FormContextProvider from "./context/FormContext.jsx";
import StepperComponent from "./components/stepper/StepperComponent.jsx";
import SuccessModal from "./components/successModal/SuccessModal.jsx";
import ApplicationsList from "./components/applicationsList/ApplicationsList.jsx";

function App() {
  return (
    <>
      <FormContextProvider>
        <Box className={styles.layout}>
          <Box className={styles.container}>
            <StepperComponent />
            <CustomRouter />
          </Box>
          <ApplicationsList />
        </Box>
        <SuccessModal />
      </FormContextProvider>
    </>
  );
}

export default App;
