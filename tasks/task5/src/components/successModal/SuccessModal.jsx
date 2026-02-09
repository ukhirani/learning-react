import { Box, Modal, Typography, Divider, Button, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
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
    setIsModalOpen(false);
    clearFormData();
  };

  const handlePrint = () => {
    window.print();
  };

  const renderField = (label, value) => {
    const displayValue = Array.isArray(value) ? value.join(", ") : value;
    if (!displayValue) return null;
    return (
      <Box className={styles.field}>
        <Typography className={styles.fieldLabel}>{label}</Typography>
        <Typography className={styles.fieldValue}>{displayValue}</Typography>
      </Box>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
    >
      <Box className={`${styles.modalContainer} ${styles.printArea}`}>
        <Box className={styles.content}>
          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <PersonOutlineIcon fontSize="small" />
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

          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <SchoolOutlinedIcon fontSize="small" />
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

          <Box className={styles.section}>
            <Typography className={styles.sectionTitle}>
              <WorkOutlineIcon fontSize="small" />
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
            startIcon={<CloseOutlinedIcon />}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            className={styles.printButton}
            startIcon={<PrintOutlinedIcon />}
          >
            Print Resume
          </Button>
          <Button
            variant="contained"
            onClick={handleStartOver}
            className={styles.startOverButton}
            startIcon={<RestartAltOutlinedIcon />}
          >
            Start Over
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
