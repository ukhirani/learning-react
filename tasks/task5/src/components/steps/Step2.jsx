import { Autocomplete, Box, TextField } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import ForwardButton from "../buttons/forwardButton/forwardButton";
import BackwardButton from "../buttons/backwardButton/backwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/formStep";
import styles from "./step2.module.css";

const degrees = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "MBA",
  "MD (Medical Doctor)",
  "JD (Law)",
  "Professional Certificate",
  "Diploma",
];

const fieldsOfStudy = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
  "Finance",
  "Marketing",
  "Psychology",
  "Medicine",
  "Law",
  "Arts & Design",
  "Data Science",
  "Artificial Intelligence",
];

const institutions = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "BITS Pilani",
  "NIT Trichy",
  "MIT",
  "Stanford University",
  "Harvard University",
  "Oxford University",
  "Cambridge University",
  "National University of Singapore",
];

const Step2 = () => {
  const { setStep, formData, updateAcademicBackground, errors, setErrors } =
    useFormContext();
  const academicBackground = formData.academicBackground;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "graduationYear"
        ? value.replace(/\D/g, "").slice(0, 4)
        : name === "gpa"
          ? value.replace(/[^0-9.]/g, "")
          : value;
    updateAcademicBackground({ [name]: nextValue });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    updateAcademicBackground({ [name]: value || "" });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateAcademicBackground = () => {
    const newErrors = {};

    if (!academicBackground.highestDegree.trim()) {
      newErrors.highestDegree = "Highest degree is required";
    }

    if (!academicBackground.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = "Field of study is required";
    }

    if (!academicBackground.institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!academicBackground.graduationYear.trim()) {
      newErrors.graduationYear = "Graduation year is required";
    } else {
      const year = parseInt(academicBackground.graduationYear, 10);
      const currentYear = new Date().getFullYear();
      if (
        isNaN(year) ||
        !/^\d{4}$/.test(academicBackground.graduationYear) ||
        year < 1900 ||
        year > currentYear
      ) {
        newErrors.graduationYear =
          "Please enter a valid year (not in the future)";
      }
    }

    if (academicBackground.gpa.trim()) {
      const gpa = parseFloat(academicBackground.gpa);
      if (isNaN(gpa) || gpa < 0 || gpa > 10) {
        newErrors.gpa = "GPA must be between 0 and 10";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateAcademicBackground()) return;
    setStep((step) => step + 1);
  };

  const prevStep = () => {
    setErrors({});
    setStep((step) => step - 1);
  };

  return (
    <FormStep title="Academic Background">
      <Box component="form" className={styles.form}>
        <Box className={styles.section}>
          <p className={styles.sectionTitle}>Education Details</p>
          <Box className={styles.gridTwo}>
            <Autocomplete
              freeSolo
              options={degrees}
              value={academicBackground.highestDegree}
              onChange={handleAutocompleteChange("highestDegree")}
              onInputChange={(e, value) =>
                updateAcademicBackground({ highestDegree: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Highest Degree"
                  variant="outlined"
                  error={!!errors.highestDegree}
                  helperText={errors.highestDegree}
                />
              )}
            />
            <Autocomplete
              freeSolo
              options={fieldsOfStudy}
              value={academicBackground.fieldOfStudy}
              onChange={handleAutocompleteChange("fieldOfStudy")}
              onInputChange={(e, value) =>
                updateAcademicBackground({ fieldOfStudy: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Field of Study"
                  variant="outlined"
                  error={!!errors.fieldOfStudy}
                  helperText={errors.fieldOfStudy}
                />
              )}
            />
          </Box>

          <Box className={styles.gridTwo}>
            <Autocomplete
              freeSolo
              options={institutions}
              value={academicBackground.institution}
              onChange={handleAutocompleteChange("institution")}
              onInputChange={(e, value) =>
                updateAcademicBackground({ institution: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Institution"
                  variant="outlined"
                  error={!!errors.institution}
                  helperText={errors.institution}
                />
              )}
            />
            <TextField
              label="Graduation Year"
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

          <Box className={styles.gridTwo}>
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
            <div></div>
          </Box>
        </Box>

        <Box className={styles.section}>
          <p className={styles.sectionTitle}>Additional Details</p>
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
            placeholder="AWS Certified, Google Cloud, PMP, etc."
          />
        </Box>
      </Box>

      <BottomBar>
        <BackwardButton onClick={prevStep}>Previous Step</BackwardButton>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};

export default Step2;
