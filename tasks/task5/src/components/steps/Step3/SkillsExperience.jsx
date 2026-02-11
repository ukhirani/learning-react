import { Autocomplete, Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const SkillsExperience = ({
  professionalBackground,
  errors,
  handleAutocompleteChange,
  handleChange,
  skillsList,
}) => {
  return (
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
            label="Key Skills *"
            variant="outlined"
            error={!!errors.skills}
            helperText={errors.skills || "Press Enter to add a skill"}
            placeholder="React, Node.js, Python, SQL..."
          />
        )}
      />

      <TextField
        label="Job Description / Responsibilities (Optional)"
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
  );
};

export default SkillsExperience;
