import { Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const OnlinePresence = ({ professionalBackground, errors, handleChange }) => {
  return (
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
  );
};

export default OnlinePresence;
