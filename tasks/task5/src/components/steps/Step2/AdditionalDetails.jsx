import { Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const AdditionalDetails = ({ academicBackground, handleChange }) => {
  return (
    <Box className={formStyles.section}>
      <p className={formStyles.sectionTitle}>Additional Details</p>
      <TextField
        label="Academic Achievements (Optional)"
        variant="outlined"
        name="achievements"
        value={academicBackground.achievements}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        placeholder="Dean's List, scholarships, honors, publications, etc."
      />

      <TextField
        label="Certifications (Optional)"
        variant="outlined"
        name="certifications"
        value={academicBackground.certifications}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
        placeholder="AWS, Google Cloud, etc."
      />
    </Box>
  );
};

export default AdditionalDetails;
