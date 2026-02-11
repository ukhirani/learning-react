import { Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const ContactDetails = ({ personalDetails, errors, handleChange }) => {
  return (
    <Box className={formStyles.section}>
      <p className={formStyles.sectionTitle}>Contact Details</p>
      <Box className={formStyles.gridTwo}>
        <TextField
          label="Email *"
          variant="outlined"
          name="email"
          type="email"
          value={personalDetails.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          autoComplete="email"
        />
        <TextField
          label="Phone *"
          variant="outlined"
          name="phone"
          type="tel"
          value={personalDetails.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
          }}
          autoComplete="tel"
        />
      </Box>
    </Box>
  );
};

export default ContactDetails;
