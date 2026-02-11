import { RestartAltOutlined } from "@mui/icons-material";
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
import BackwardButton from "../buttons/backwardButton/BackwardButton.jsx";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormContext } from "../../context/FormContext";
import { countries, states } from "../../constants/options";
import {
  isValidEmail,
  isValidMobile,
  isValidName,
  isValidPinCode,
  sanitizeAlpha,
  sanitizeDigits,
} from "../../utils/formUtils";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/FormStep.jsx";
import formStyles from "../formStep/formStep.module.css";

const Step1 = () => {
  const {
    clearFormData,
    setStep,
    formData,
    updatePersonalDetails,
    errors,
    setErrors,
  } = useFormContext();
  const personalDetails = formData.personalDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "phone"
        ? sanitizeDigits(value, 10)
        : name === "zipCode"
          ? sanitizeDigits(value, 6)
          : ["firstName", "lastName", "city"].includes(name)
            ? sanitizeAlpha(value)
            : value;
    updatePersonalDetails({ [name]: nextValue });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    const sanitized =
      name === "state" || name === "country"
        ? sanitizeAlpha(value || "")
        : value || "";
    updatePersonalDetails({ [name]: sanitized });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteInputChange = (name) => (event, value) => {
    const sanitized =
      name === "state" || name === "country"
        ? sanitizeAlpha(value || "")
        : value || "";
    updatePersonalDetails({ [name]: sanitized });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePersonalDetails = () => {
    const newErrors = {};

    if (!personalDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!isValidName(personalDetails.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!personalDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!isValidName(personalDetails.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (!personalDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(personalDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!personalDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidMobile(personalDetails.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!personalDetails.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dobCheck = new dayjs(personalDetails.dateOfBirth);
      if (new dayjs() < dobCheck) {
        newErrors.dateOfBirth = "Date of birth cannot be in future"; // validation for when user enters the date via keyboard
      } else {
        console.log("it passed");
      }
    }

    if (!personalDetails.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!personalDetails.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!personalDetails.city.trim()) {
      newErrors.city = "City is required";
    } else if (!isValidName(personalDetails.city)) {
      newErrors.city = "City should contain only letters";
    }

    if (!personalDetails.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!personalDetails.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!isValidPinCode(personalDetails.zipCode)) {
      newErrors.zipCode = "Enter a valid 6-digit PIN code";
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
    <FormStep title="Personal Details *">
      <Box component="form" className={formStyles.form}>
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
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

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

        <Box className={formStyles.section}>
          <p className={formStyles.sectionTitle}>Address</p>
          <TextField
            label="Address *"
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

          <Box className={formStyles.gridTwo}>
            <TextField
              label="City *"
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
              // freeSolo
              options={states}
              value={personalDetails.state}
              onChange={handleAutocompleteChange("state")}
              onInputChange={handleAutocompleteInputChange("state")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State *"
                  variant="outlined"
                  error={!!errors.state}
                  helperText={errors.state}
                  autoComplete="off"
                />
              )}
            />
          </Box>

          <Box className={formStyles.gridTwo}>
            <TextField
              label="Zip Code *"
              variant="outlined"
              name="zipCode"
              value={personalDetails.zipCode}
              onChange={handleChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              fullWidth
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 6,
              }}
              autoComplete="postal-code"
            />
            <Autocomplete
              // freeSolo
              options={countries}
              value={personalDetails.country}
              onChange={handleAutocompleteChange("country")}
              onInputChange={handleAutocompleteInputChange("country")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country *"
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
        <BackwardButton
          color={"error"}
          icon={<RestartAltOutlined />}
          onClick={clearFormData}
        >
          Reset
        </BackwardButton>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step1;
