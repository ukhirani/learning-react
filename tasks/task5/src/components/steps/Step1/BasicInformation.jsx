import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import formStyles from "../../formStep/formStep.module.css";

const BasicInformation = ({
  personalDetails,
  errors,
  handleChange,
  updatePersonalDetails,
  setErrors,
}) => {
  return (
    <Box className={formStyles.section}>
      <p className={formStyles.sectionTitle}>Basic Information</p>
      <Box className={formStyles.gridTwo}>
        <TextField
          label="First Name *"
          variant="outlined"
          name="firstName"
          value={personalDetails.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          autoComplete="given-name"
        />
        <TextField
          label="Last Name *"
          variant="outlined"
          name="lastName"
          value={personalDetails.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          autoComplete="family-name"
        />
      </Box>

      <Box className={formStyles.gridTwo}>
        <DatePicker
          label="Date of Birth *"
          maxDate={new dayjs()} // Prevent selection of future dates
          value={
            personalDetails.dateOfBirth
              ? dayjs(personalDetails.dateOfBirth)
              : null
          }
          onChange={(value) => {
            const nextValue = value?.isValid()
              ? value.format("YYYY-MM-DD")
              : "";

            updatePersonalDetails({ dateOfBirth: nextValue });

            if (errors.dateOfBirth) {
              setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
            }
          }}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: !!errors.dateOfBirth,
              helperText: errors.dateOfBirth,
              autoComplete: "bday",
            },
          }}
        />
        <FormControl variant="outlined" fullWidth error={!!errors.gender}>
          <InputLabel id="gender-label">Gender *</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            label="Gender *"
            value={personalDetails.gender}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="non-binary">Non-binary</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
      </Box>
    </Box>
  );
};

export default BasicInformation;
