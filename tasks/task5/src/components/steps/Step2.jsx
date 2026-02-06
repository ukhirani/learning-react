import { useFormContext } from "../../context/FormContext";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BackwardButton from "../buttons/backwardButton/backwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/formStep";

const Step2 = () => {
  const { setStep } = useFormContext();

  const nextStep = () => {
    // validationLogic  goes here
    setStep((step) => step + 1);
  };

  const prevStep = () => {
    setStep((step) => step - 1);
  };

  return (
    <FormStep>
      Step 2
      <BottomBar>
        <BackwardButton onClick={prevStep}>Previous Step</BackwardButton>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step2;
