import { useState } from "react";
import {
  Box,
  FormControl,
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

const Step1 = () => {
  const { setStep } = useFormContext();
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validatePersonalDetails = () => {
    // TODO: add validation logic
    return true;
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
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={personalDetails.lastName}
              onChange={handleChange}
              fullWidth
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
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={personalDetails.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
              </Select>
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
              value={personalDetails.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              variant="outlined"
              name="phone"
              value={personalDetails.phone}
              onChange={handleChange}
              fullWidth
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
            fullWidth
          />

          <Box className={styles.gridTwo}>
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={personalDetails.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="State"
              variant="outlined"
              name="state"
              value={personalDetails.state}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Box className={styles.gridTwo}>
            <TextField
              label="Zip Code"
              variant="outlined"
              name="zipCode"
              value={personalDetails.zipCode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Country"
              variant="outlined"
              name="country"
              value={personalDetails.country}
              onChange={handleChange}
              fullWidth
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
