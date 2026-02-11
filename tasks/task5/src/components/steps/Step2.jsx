import { Box } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { degrees, fieldsOfStudy, institutions } from "../../constants/options";
import {
  isValidGpa,
  isValidYear,
  sanitizeDecimal,
  sanitizeDigits,
} from "../../utils/formUtils";
import ForwardButton from "../buttons/forwardButton/ForwardButton.jsx";
import BackwardButton from "../buttons/backwardButton/BackwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/FormStep.jsx";
import formStyles from "../formStep/formStep.module.css";
import EducationDetails from "./Step2/EducationDetails.jsx";
import AdditionalDetails from "./Step2/AdditionalDetails.jsx";

const Step2 = () => {
  const { setStep, formData, updateAcademicBackground, errors, setErrors } =
    useFormContext();
  const academicBackground = formData.academicBackground;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "graduationYear"
        ? sanitizeDigits(value, 4)
        : name === "gpa"
          ? sanitizeDecimal(value)
          : value;
    updateAcademicBackground({ [name]: nextValue });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    updateAcademicBackground({ [name]: value || "" });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAcademicBackground = () => {
    const newErrors = {};

    if (!academicBackground.highestDegree.trim()) {
      newErrors.highestDegree = "Highest degree is required";
    }

    if (!academicBackground.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = "Field of study is required";
    }

    if (!academicBackground.institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!academicBackground.graduationYear.trim()) {
      newErrors.graduationYear = "Graduation year is required";
    } else {
      const dob = formData.personalDetails.dateOfBirth;
      if (!isValidYear(academicBackground.graduationYear, dob)) {
        const dobYear = new Date(dob).getFullYear();
        newErrors.graduationYear =
          "Graduation Date cannot be on or before Year of Birth (" +
          dobYear +
          ")";
      }
    }

    if (academicBackground.gpa.trim()) {
      if (!isValidGpa(academicBackground.gpa)) {
        newErrors.gpa = "GPA must be between 0 and 10";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateAcademicBackground()) return;
    setStep((step) => step + 1);
  };

  const prevStep = () => {
    setErrors({});
    setStep((step) => step - 1);
  };

  return (
    <FormStep title="Academic Background *">
      <Box component="form" className={formStyles.form}>
        <EducationDetails
          academicBackground={academicBackground}
          errors={errors}
          handleAutocompleteChange={handleAutocompleteChange}
          updateAcademicBackground={updateAcademicBackground}
          handleChange={handleChange}
          degrees={degrees}
          fieldsOfStudy={fieldsOfStudy}
          institutions={institutions}
        />
        <AdditionalDetails
          academicBackground={academicBackground}
          handleChange={handleChange}
        />
      </Box>

      <BottomBar>
        <BackwardButton onClick={prevStep}>Previous Step</BackwardButton>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step2;
