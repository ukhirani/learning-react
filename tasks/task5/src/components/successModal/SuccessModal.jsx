import { Box, Modal, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useFormContext } from "../../context/FormContext";
import styles from "./successModal.module.css";

const SuccessModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    formData,
    applications,
    selectedApplicationId,
    removeApplication,
    startEditingApplication,
    clearFormData,
    openConfirm,
  } = useFormContext();
  const navigate = useNavigate();

  const selectedApplication = applications.find(
    (entry) => entry.id === selectedApplicationId,
  );

  const activeData = selectedApplication?.data || formData;
  const personalDetails = activeData?.personalDetails || {};
  const academicBackground = activeData?.academicBackground || {};
  const professionalBackground = activeData?.professionalBackground || {};

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    if (!selectedApplicationId) return;
    startEditingApplication(selectedApplicationId);
    setIsModalOpen(false);
    navigate("/");
  };

  const handleRemove = () => {
    if (!selectedApplicationId) return;
    openConfirm("Remove this application permanently?", (ok) => {
      if (ok) {
        removeApplication(selectedApplicationId);
        clearFormData();
        setIsModalOpen(false);
      }
    });
  };

  const handlePrint = () => {
    const printContents = document.getElementById("print-area").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
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
      <Box
        id="print-area"
        className={`${styles.modalContainer} ${styles.printArea}`}
      >
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
                [personalDetails.firstName, personalDetails.lastName]
                  .filter(Boolean)
                  .join(" "),
              )}
              {renderField("Email", personalDetails.email)}
              {renderField("Phone", personalDetails.phone)}
              {renderField("Date of Birth", personalDetails.dateOfBirth)}
              {renderField("Gender", personalDetails.gender)}
              {renderField(
                "Address",
                [
                  personalDetails.address,
                  personalDetails.city,
                  personalDetails.state,
                  personalDetails.zipCode,
                  personalDetails.country,
                ]
                  .filter(Boolean)
                  .join(", "),
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
            onClick={handleEdit}
            className={styles.editButton}
            startIcon={<EditOutlinedIcon />}
            disabled={!selectedApplicationId}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={handleRemove}
            className={styles.removeButton}
            startIcon={<DeleteOutlineOutlinedIcon />}
            disabled={!selectedApplicationId}
          >
            Remove
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            className={styles.printButton}
            startIcon={<PrintOutlinedIcon />}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            className={styles.closeButton}
            startIcon={<CloseOutlinedIcon />}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
