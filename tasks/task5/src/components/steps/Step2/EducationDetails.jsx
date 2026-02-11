import { Autocomplete, Box, TextField } from "@mui/material";
import formStyles from "../../formStep/formStep.module.css";

const EducationDetails = ({
  academicBackground,
  errors,
  handleAutocompleteChange,
  updateAcademicBackground,
  handleChange,
  degrees,
  fieldsOfStudy,
  institutions,
}) => {
  return (
    <Box className={formStyles.section}>
      <p className={formStyles.sectionTitle}>Education Details</p>
      <Box className={formStyles.gridTwo}>
        <Autocomplete
          // freeSolo
          options={degrees}
          value={academicBackground.highestDegree}
          onChange={handleAutocompleteChange("highestDegree")}
          onInputChange={(e, value) =>
            updateAcademicBackground({ highestDegree: value })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Highest Degree *"
              variant="outlined"
              error={!!errors.highestDegree}
              helperText={errors.highestDegree}
            />
          )}
        />
        <Autocomplete
          // freeSolo
          options={fieldsOfStudy}
          value={academicBackground.fieldOfStudy}
          onChange={handleAutocompleteChange("fieldOfStudy")}
          onInputChange={(e, value) =>
            updateAcademicBackground({ fieldOfStudy: value })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Field of Study *"
              variant="outlined"
              error={!!errors.fieldOfStudy}
              helperText={errors.fieldOfStudy}
            />
          )}
        />
      </Box>

      <Box className={formStyles.gridTwo}>
        <Autocomplete
          // freeSolo
          options={institutions}
          value={academicBackground.institution}
          onChange={handleAutocompleteChange("institution")}
          onInputChange={(e, value) =>
            updateAcademicBackground({ institution: value })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Institution *"
              variant="outlined"
              error={!!errors.institution}
              helperText={errors.institution}
            />
          )}
        />
        <TextField
          label="Graduation Year *"
          variant="outlined"
          name="graduationYear"
          type="number"
          value={academicBackground.graduationYear}
          onChange={handleChange}
          error={!!errors.graduationYear}
          helperText={errors.graduationYear}
          fullWidth
          inputProps={{
            min: 1900,
            max: new Date().getFullYear(),
            maxLength: 4,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </Box>

      <Box className={formStyles.gridTwo}>
        <TextField
          label="GPA / CGPA (Optional)"
          variant="outlined"
          name="gpa"
          value={academicBackground.gpa}
          onChange={handleChange}
          error={!!errors.gpa}
          helperText={errors.gpa || "Scale: 0-10"}
          fullWidth
          inputProps={{ inputMode: "decimal" }}
        />
      </Box>
    </Box>
  );
};

export default EducationDetails;
