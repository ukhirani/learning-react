import { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

const FormContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const stepLabels = [
    "Personal Details",
    "Academic Background",
    "Professional Background",
  ];

  const value = {
    step,
    setStep,
    stepLabels,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

export default FormContextProvider;
