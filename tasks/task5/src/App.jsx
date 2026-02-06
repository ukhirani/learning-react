import "./App.css";
import CustomRouter from "./components/CustomRouter.jsx";
import styles from "./app.module.css";
import { useContext, useState } from "react";
import { Box } from "@mui/material";
import FormContextProvider from "./context/FormContext.jsx";
import StepperComponent from "./components/stepper/stepperComponent.jsx";

function App() {
  const [step, setStep] = useState(0);
  const value = { step, setStep };
  const appContext = useContext(value);

  return (
    <>
      <Box className={styles.container}>
        <FormContextProvider>
          <StepperComponent />
          <CustomRouter />
        </FormContextProvider>
      </Box>
    </>
  );
}

export default App;
