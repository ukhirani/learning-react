import { Box } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { industries, jobTitles, skillsList } from "../../constants/options";
import { sanitizeDecimal } from "../../utils/formUtils";
import ForwardButton from "../buttons/forwardButton/ForwardButton.jsx";
import BackwardButton from "../buttons/backwardButton/BackwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/FormStep.jsx";
import formStyles from "../formStep/formStep.module.css";
import CurrentEmployment from "./Step3/CurrentEmployment.jsx";
import SkillsExperience from "./Step3/SkillsExperience.jsx";
import OnlinePresence from "./Step3/OnlinePresence.jsx";

const Step3 = () => {
  const {
    setStep,
    formData,
    updateProfessionalBackground,
    errors,
    setErrors,
    setIsModalOpen,
    clearFormData,
  } = useFormContext();
  const professionalBackground = formData.professionalBackground;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "yearsOfExperience" ? sanitizeDecimal(value) : value;
    updateProfessionalBackground({ [name]: nextValue });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    if (name === "skills") {
      const normalized = (value || [])
        .map((item) => item.trim())
        .filter(Boolean);
      updateProfessionalBackground({ skills: normalized });
    } else {
      updateProfessionalBackground({ [name]: value || "" });
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfessionalBackground = () => {
    const newErrors = {};

    if (!professionalBackground.currentJobTitle.trim()) {
      newErrors.currentJobTitle = "Job title is required";
    }

    if (!professionalBackground.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!professionalBackground.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!professionalBackground.yearsOfExperience.trim()) {
      newErrors.yearsOfExperience = "Years of experience is required";
    } else {
      const years = parseFloat(professionalBackground.yearsOfExperience);
      if (isNaN(years) || years < 0 || years > 60) {
        newErrors.yearsOfExperience = "Please enter a valid number (0-60)";
      }
    }

    if (!professionalBackground.skills.length) {
      newErrors.skills = "Skills are required";
    }

    if (professionalBackground.linkedinUrl.trim()) {
      const linkedinPattern =
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
      if (!linkedinPattern.test(professionalBackground.linkedinUrl)) {
        newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
      }
    }

    if (professionalBackground.portfolioUrl.trim()) {
      const urlRegex =
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
      if (professionalBackground.portfolioUrl.trim()) {
        if (!urlRegex.test(professionalBackground.portfolioUrl.trim())) {
          newErrors.portfolioUrl = "Please enter a valid URL";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateProfessionalBackground()) return;
    if (confirm("Are you sure you want to submit the form ?")) {
      clearFormData();
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((step) => step - 1);
  };

  return (
    <FormStep title="Professional Background *">
      <Box component="form" className={formStyles.form}>
        <CurrentEmployment
          professionalBackground={professionalBackground}
          errors={errors}
          handleAutocompleteChange={handleAutocompleteChange}
          updateProfessionalBackground={updateProfessionalBackground}
          handleChange={handleChange}
          jobTitles={jobTitles}
          industries={industries}
        />
        <SkillsExperience
          professionalBackground={professionalBackground}
          errors={errors}
          handleAutocompleteChange={handleAutocompleteChange}
          handleChange={handleChange}
          skillsList={skillsList}
        />
        <OnlinePresence
          professionalBackground={professionalBackground}
          errors={errors}
          handleChange={handleChange}
        />
      </Box>

      <BottomBar>
        <BackwardButton onClick={prevStep}>Previous Step</BackwardButton>
        <ForwardButton onClick={handleSubmit}>Submit</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step3;
