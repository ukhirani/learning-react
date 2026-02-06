import { Box, Button } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import ForwardButton from "../buttons/forwardButton/forwardButton";

const Step1 = () => {
  const { setStep } = useFormContext();

  const nextStep = () => {
    // validationLogic  goes here
    setStep((step) => step + 1);
  };

  return (
    <Box>
      Step 1<ForwardButton onClick={nextStep}>Next Step</ForwardButton>
    </Box>
  );
};

export default Step1;
