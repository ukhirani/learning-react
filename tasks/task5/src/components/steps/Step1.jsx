import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/formStep";
import styles from "./step1.module.css";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "Singapore",
  "UAE",
  "Netherlands",
  "Sweden",
  "Switzerland",
];

const states = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "Delhi",
  "Uttar Pradesh",
  "West Bengal",
  "Kerala",
  "Telangana",
  "California",
  "Texas",
  "New York",
  "Florida",
  "Washington",
];

const Step1 = () => {
  const { setStep, formData, updatePersonalDetails, errors, setErrors } =
    useFormContext();
  const personalDetails = formData.personalDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    updatePersonalDetails({ [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    updatePersonalDetails({ [name]: value || "" });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePersonalDetails = () => {
    const newErrors = {};

    if (!personalDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!personalDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!personalDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!personalDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(personalDetails.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!personalDetails.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!personalDetails.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!personalDetails.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!personalDetails.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!personalDetails.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!personalDetails.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    }

    if (!personalDetails.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validatePersonalDetails()) return;
    setStep((step) => step + 1);
  };

  return (
    <FormStep title="Personal Details">
      <Box component="form" className={styles.form}>
        <Box className={styles.section}>
          <p className={styles.sectionTitle}>Basic Information</p>
          <Box className={styles.gridTwo}>
            <TextField
              label="First Name"
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
              label="Last Name"
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

          <Box className={styles.gridTwo}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              name="dateOfBirth"
              value={personalDetails.dateOfBirth}
              onChange={handleChange}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              fullWidth
              InputLabelProps={{ shrink: true }}
              autoComplete="bday"
            />
            <FormControl variant="outlined" fullWidth error={!!errors.gender}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                label="Gender"
                value={personalDetails.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

        <Box className={styles.section}>
          <p className={styles.sectionTitle}>Contact Details</p>
          <Box className={styles.gridTwo}>
            <TextField
              label="Email"
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
              label="Phone"
              variant="outlined"
              name="phone"
              type="tel"
              value={personalDetails.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              autoComplete="tel"
            />
          </Box>
        </Box>

        <Box className={styles.section}>
          <p className={styles.sectionTitle}>Address</p>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={personalDetails.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            multiline
            rows={2}
            autoComplete="street-address"
          />

          <Box className={styles.gridTwo}>
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={personalDetails.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              fullWidth
              autoComplete="address-level2"
            />
            <Autocomplete
              freeSolo
              options={states}
              value={personalDetails.state}
              onChange={handleAutocompleteChange("state")}
              onInputChange={(e, value) =>
                updatePersonalDetails({ state: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  variant="outlined"
                  error={!!errors.state}
                  helperText={errors.state}
                  autoComplete="address-level1"
                />
              )}
            />
          </Box>

          <Box className={styles.gridTwo}>
            <TextField
              label="Zip Code"
              variant="outlined"
              name="zipCode"
              value={personalDetails.zipCode}
              onChange={handleChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              fullWidth
              autoComplete="postal-code"
            />
            <Autocomplete
              freeSolo
              options={countries}
              value={personalDetails.country}
              onChange={handleAutocompleteChange("country")}
              onInputChange={(e, value) =>
                updatePersonalDetails({ country: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country}
                  autoComplete="country-name"
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      <BottomBar>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step1;
