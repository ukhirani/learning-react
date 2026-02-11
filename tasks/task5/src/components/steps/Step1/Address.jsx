import { Autocomplete, Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const Address = ({
  personalDetails,
  errors,
  handleChange,
  handleAutocompleteChange,
  handleAutocompleteInputChange,
  states,
  countries,
}) => {
  return (
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
  );
};

export default Address;
