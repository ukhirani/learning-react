import { Box } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormContext } from "../../context/FormContext";
import styles from "./stepper.module.css";
const stepperComponent = () => {
  const { step, stepLabels } = useFormContext();

  return (
    <Box className={styles.container}>
      <Stepper activeStep={step} className={styles.stepper} alternativeLabel>
        {stepLabels.map((label, index) => {
          return (
            <Step className={styles.step}>
              <StepLabel
                className={styles.label}
                slotProps={{
                  stepIcon: {
                    classes: { root: styles.icon },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default stepperComponent;
