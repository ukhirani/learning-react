import { Autocomplete, Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const CurrentEmployment = ({
  professionalBackground,
  errors,
  handleAutocompleteChange,
  updateProfessionalBackground,
  handleChange,
  jobTitles,
  industries,
}) => {
  return (
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
              label="Current Job Title *"
              variant="outlined"
              error={!!errors.currentJobTitle}
              helperText={errors.currentJobTitle}
            />
          )}
        />
        <TextField
          label="Company *"
          variant="outlined"
          name="company"
          value={professionalBackground.company}
          onChange={handleChange}
          error={!!errors.company}
          helperText={errors.company}
          fullWidth
          autoComplete="off"
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
              label="Industry *"
              variant="outlined"
              error={!!errors.industry}
              helperText={errors.industry}
            />
          )}
        />
        <TextField
          label="Years of Experience *"
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
  );
};

export default CurrentEmployment;
