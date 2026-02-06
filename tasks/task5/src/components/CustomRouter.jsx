import { Box } from "@mui/material";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { useFormContext } from "../context/FormContext";

const CustomRouter = () => {
  const { step } = useFormContext();
  const routes = [<Step1 />, <Step2 />, <Step3 />];

  return <Box>{routes[step]}</Box>;
};

export default CustomRouter;
