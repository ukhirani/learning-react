import { Box, Modal, Typography, Divider, Button, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useFormContext } from "../../context/FormContext";
import styles from "./successModal.module.css";

const SuccessModal = () => {
  const { isModalOpen, setIsModalOpen, formData, clearFormData } =
    useFormContext();

  const { personalDetails, academicBackground, professionalBackground } =
    formData;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleStartOver = () => {
    clearFormData();
    setIsModalOpen(false);
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <Box className={styles.field}>
        <Typography className={styles.fieldLabel}>{label}</Typography>
        <Typography className={styles.fieldValue}>{value}</Typography>
      </Box>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
    >
      <Box className={styles.modalContainer}>
        <Box className={styles.header}>
          <CheckCircleOutlineIcon className={styles.successIcon} />
          <Typography variant="h5" className={styles.title}>
            Form Submitted Successfully!
          </Typography>
          <Typography className={styles.subtitle}>
            Here's a summary of the information you provided
          </Typography>
        </Box>

        <Box className={styles.content}>
          {/* Personal Details Section */}
          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <Chip label="1" size="small" className={styles.chip} />
              Personal Details
            </Typography>
            <Divider className={styles.divider} />
            <Box className={styles.fieldsGrid}>
              {renderField(
                "Full Name",
                `${personalDetails.firstName} ${personalDetails.lastName}`,
              )}
              {renderField("Email", personalDetails.email)}
              {renderField("Phone", personalDetails.phone)}
              {renderField("Date of Birth", personalDetails.dateOfBirth)}
              {renderField("Gender", personalDetails.gender)}
              {renderField(
                "Address",
                `${personalDetails.address}, ${personalDetails.city}, ${personalDetails.state} ${personalDetails.zipCode}, ${personalDetails.country}`,
              )}
            </Box>
          </Box>

          {/* Academic Background Section */}
          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <Chip label="2" size="small" className={styles.chip} />
              Academic Background
            </Typography>
            <Divider className={styles.divider} />
            <Box className={styles.fieldsGrid}>
              {renderField("Highest Degree", academicBackground.highestDegree)}
              {renderField("Field of Study", academicBackground.fieldOfStudy)}
              {renderField("Institution", academicBackground.institution)}
              {renderField(
                "Graduation Year",
                academicBackground.graduationYear,
              )}
              {renderField("GPA", academicBackground.gpa)}
              {renderField("Achievements", academicBackground.achievements)}
              {renderField("Certifications", academicBackground.certifications)}
            </Box>
          </Box>

          {/* Professional Background Section */}
          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <Chip label="3" size="small" className={styles.chip} />
              Professional Background
            </Typography>
            <Divider className={styles.divider} />
            <Box className={styles.fieldsGrid}>
              {renderField("Job Title", professionalBackground.currentJobTitle)}
              {renderField("Company", professionalBackground.company)}
              {renderField("Industry", professionalBackground.industry)}
              {renderField(
                "Experience",
                `${professionalBackground.yearsOfExperience} years`,
              )}
              {renderField("Skills", professionalBackground.skills)}
              {renderField(
                "Job Description",
                professionalBackground.jobDescription,
              )}
              {renderField("LinkedIn", professionalBackground.linkedinUrl)}
              {renderField("Portfolio", professionalBackground.portfolioUrl)}
            </Box>
          </Box>
        </Box>

        <Box className={styles.actions}>
          <Button
            variant="outlined"
            onClick={handleClose}
            className={styles.closeButton}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleStartOver}
            className={styles.startOverButton}
          >
            Start Over
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
