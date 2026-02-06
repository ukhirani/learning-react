import { useFormContext } from "../../context/FormContext";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/formStep";

const Step1 = () => {
  const { setStep } = useFormContext();

  const nextStep = () => {
    // validationLogic  goes here
    setStep((step) => step + 1);
  };

  return (
    <FormStep>
      Step 1
      <BottomBar>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step1;
