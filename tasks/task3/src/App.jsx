import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormHelperText,
  Slider,
  Chip,
  Alert,
  Paper,
} from "@mui/material";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    availability: "",
    skills: [],
    expectedSalary: 50000,
    coverLetter: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
  ];

  const skillOptions = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Design",
  ];

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\+?[\d\s-()]{10,}$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "position":
        if (!value) {
          error = "Please select a position";
        }
        break;
      case "experience":
        if (!value) {
          error = "Please select your experience level";
        }
        break;
      case "availability":
        if (!value) {
          error = "Please select your availability";
        }
        break;

      case "coverLetter":
        if (!value.trim()) {
          error = "Cover letter is required";
        } else if (value.trim().length < 20) {
          error = "Cover letter must be at least 20 characters";
        }
        break;
      case "agreeTerms":
        if (!value) {
          error = "You must agree to the terms and conditions";
        }
        break;
      default:
        console.log("unknown field !");
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm({ ...form, [name]: fieldValue });

    const error = validateField(name, fieldValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleSkillToggle = (skill) => {
    const updatedSkills = form.skills.includes(skill)
      ? form.skills.filter((s) => s !== skill)
      : [...form.skills, skill];

    setForm({ ...form, skills: updatedSkills });
  };

  const handleSliderChange = (e, value) => {
    setForm({ ...form, expectedSalary: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "skills") {
        const error = validateField(key, form[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, mb: 4, px: 2 }}>
      <Paper sx={{ p: 4, boxShadow: "none" }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Job Application Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
            Personal Information
          </Typography>

          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.email} // new thing i learnt - which is double negation to convert to boolean
              helperText={errors.email}
              sx={{ flex: 1, minWidth: "250px" }}
            />

            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ flex: 1, minWidth: "250px" }}
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Position Details
          </Typography>

          <TextField
            select
            label="Desired Position"
            name="position"
            value={form.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.position}
            helperText={errors.position}
          >
            {positions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.experience}
            sx={{ width: "100%" }}
          >
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Years of Experience *
            </FormLabel>
            <RadioGroup
              name="experience"
              value={form.experience}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="0-2"
                control={<Radio />}
                label="0-2 years"
              />
              <FormControlLabel
                value="3-5"
                control={<Radio />}
                label="3-5 years"
              />
              <FormControlLabel
                value="6-10"
                control={<Radio />}
                label="6-10 years"
              />
              <FormControlLabel
                value="10+"
                control={<Radio />}
                label="10+ years"
              />
            </RadioGroup>
            {errors.experience && (
              <FormHelperText>{errors.experience}</FormHelperText>
            )}
          </FormControl>

          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Technical Skills
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {skillOptions.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => handleSkillToggle(skill)}
                color={form.skills.includes(skill) ? "primary" : "default"}
                variant={form.skills.includes(skill) ? "filled" : "outlined"}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Expected Salary (Annual)
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={form.expectedSalary}
              onChange={handleSliderChange}
              min={30000}
              max={200000}
              step={5000}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value.toString()} Rs. `}
            />
          </Box>

          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.availability}
            fullWidth
            sx={{ mt: 1 }}
          >
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Availability *
            </FormLabel>
            <RadioGroup
              name="availability"
              value={form.availability}
              onChange={handleChange}
            >
              <FormControlLabel
                value="immediate"
                control={<Radio />}
                label="Immediately"
              />
              <FormControlLabel
                value="2weeks"
                control={<Radio />}
                label="2 weeks notice"
              />
              <FormControlLabel
                value="1month"
                control={<Radio />}
                label="1 month notice"
              />
            </RadioGroup>
            {errors.availability && (
              <FormHelperText>{errors.availability}</FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Cover Letter"
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            error={!!errors.coverLetter}
            helperText={errors.coverLetter}
          />

          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                />
              }
              label="I agree to the terms and conditions and privacy policy. *"
            />
            {errors.agreeTerms && (
              <FormHelperText error>{errors.agreeTerms}</FormHelperText>
            )}
          </FormGroup>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Submit Application
          </Button>
        </form>
        {submitted && (
          <Alert severity="success" sx={{ mb: 3, mt: 3 }}>
            Application submitted successfully !!!!!
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default App;
