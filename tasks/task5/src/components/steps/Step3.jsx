import { Autocomplete, Box, TextField } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import { industries, jobTitles, skillsList } from "../../constants/options";
import { sanitizeDecimal } from "../../utils/formUtils";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BackwardButton from "../buttons/backwardButton/backwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/formStep";
import formStyles from "../formStep/formStep.module.css";

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
      try {
        new URL(professionalBackground.portfolioUrl);
      } catch {
        newErrors.portfolioUrl = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateProfessionalBackground()) return;
    setIsModalOpen(true);
  };

  const prevStep = () => {
    setErrors({});
    setStep((step) => step - 1);
  };

  return (
    <FormStep title="Professional Background">
      <Box component="form" className={formStyles.form}>
        <Box className={formStyles.section}>
          <p className={formStyles.sectionTitle}>Current Employment</p>
          <Box className={formStyles.gridTwo}>
            <Autocomplete
              // freeSolo
              options={jobTitles}
              value={professionalBackground.currentJobTitle}
              onChange={handleAutocompleteChange("currentJobTitle")}
              onInputChange={(e, value) =>
                updateProfessionalBackground({ currentJobTitle: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Current Job Title"
                  variant="outlined"
                  error={!!errors.currentJobTitle}
                  helperText={errors.currentJobTitle}
                />
              )}
            />
            <TextField
              label="Company"
              variant="outlined"
              name="company"
              value={professionalBackground.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
              fullWidth
              autoComplete="organization"
            />
          </Box>

          <Box className={formStyles.gridTwo}>
            <Autocomplete
              // freeSolo
              options={industries}
              value={professionalBackground.industry}
              onChange={handleAutocompleteChange("industry")}
              onInputChange={(e, value) =>
                updateProfessionalBackground({ industry: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Industry"
                  variant="outlined"
                  error={!!errors.industry}
                  helperText={errors.industry}
                />
              )}
            />
            <TextField
              label="Years of Experience"
              variant="outlined"
              name="yearsOfExperience"
              type="number"
              value={professionalBackground.yearsOfExperience}
              onChange={handleChange}
              error={!!errors.yearsOfExperience}
              helperText={errors.yearsOfExperience}
              fullWidth
              inputProps={{ min: 0, max: 60, step: 0.5, inputMode: "decimal" }}
            />
          </Box>
        </Box>

        <Box className={formStyles.section}>
          <p className={formStyles.sectionTitle}>Skills & Experience</p>
          <Autocomplete
            // freeSolo
            multiple
            filterSelectedOptions
            options={skillsList}
            value={professionalBackground.skills}
            onChange={handleAutocompleteChange("skills")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Key Skills"
                variant="outlined"
                error={!!errors.skills}
                helperText={errors.skills || "Press Enter to add a skill"}
                placeholder="React, Node.js, Python, SQL..."
              />
            )}
          />

          <TextField
            label="Job Description / Responsibilities"
            variant="outlined"
            name="jobDescription"
            value={professionalBackground.jobDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            placeholder="Describe your current role, key responsibilities, and achievements..."
          />
        </Box>

        <Box className={formStyles.section}>
          <p className={formStyles.sectionTitle}>Online Presence (Optional)</p>
          <Box className={formStyles.gridTwo}>
            <TextField
              label="LinkedIn URL"
              variant="outlined"
              name="linkedinUrl"
              value={professionalBackground.linkedinUrl}
              onChange={handleChange}
              error={!!errors.linkedinUrl}
              helperText={errors.linkedinUrl}
              fullWidth
              placeholder="https://linkedin.com/in/yourprofile"
              autoComplete="url"
            />
            <TextField
              label="Portfolio / Website URL"
              variant="outlined"
              name="portfolioUrl"
              value={professionalBackground.portfolioUrl}
              onChange={handleChange}
              error={!!errors.portfolioUrl}
              helperText={errors.portfolioUrl}
              fullWidth
              placeholder="https://yourportfolio.com"
              autoComplete="url"
            />
          </Box>
        </Box>
      </Box>

      <BottomBar>
        <BackwardButton onClick={prevStep}>Previous Step</BackwardButton>
        <ForwardButton onClick={handleSubmit}>Submit</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step3;
