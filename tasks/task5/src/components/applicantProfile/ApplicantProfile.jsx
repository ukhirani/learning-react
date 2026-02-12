import { Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useFormContext } from "../../context/FormContext";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import successStyles from "../successModal/successModal.module.css";
import styles from "./applicantProfile.module.css";

const ApplicantProfile = () => {
  const { applicationID } = useParams();
  const {
    applications,
    removeApplication,
    startEditingApplication,
    openConfirm,
    clearFormData,
  } = useFormContext();

  const navigate = useNavigate();

  const application = applications.find((app) => app.id === applicationID);

  if (!application) {
    return <NotFoundPage />;
  }

  const activeData = application.data || {};
  const personalDetails = activeData?.personalDetails || {};
  const academicBackground = activeData?.academicBackground || {};
  const professionalBackground = activeData?.professionalBackground || {};

  const handleEdit = () => {
    startEditingApplication(applicationID);
    navigate("/form");
  };

  const handleDelete = () => {
    openConfirm("Remove this application permanently?", (ok) => {
      if (ok) {
        navigate("/");
        removeApplication(applicationID);
        clearFormData();
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    navigate("/");
  };

  const renderField = (label, value) => {
    const displayValue = Array.isArray(value) ? value.join(", ") : value;
    if (!displayValue) return null;
    return (
      <Box className={successStyles.field}>
        <Typography className={successStyles.fieldLabel}>{label}</Typography>
        <Typography className={successStyles.fieldValue}>
          {displayValue}
        </Typography>
      </Box>
    );
  };

  return (
    <Box className={styles.pageWrapper}>
      <Box
        id="print-area"
        className={`${successStyles.modalContainer} ${styles.pageContainer}`}
      >
        <Box className={successStyles.content}>
          <Box className={successStyles.section}>
            <Typography className={successStyles.sectionTitle}>
              <PersonOutlineIcon fontSize="small" />
              Personal Details
            </Typography>
            <Divider className={successStyles.divider} />
            <Box className={successStyles.fieldsGrid}>
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

          <Box className={successStyles.section}>
            <Typography className={successStyles.sectionTitle}>
              <SchoolOutlinedIcon fontSize="small" />
              Academic Background
            </Typography>
            <Divider className={successStyles.divider} />
            <Box className={successStyles.fieldsGrid}>
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

          <Box className={successStyles.section}>
            <Typography className={successStyles.sectionTitle}>
              <WorkOutlineIcon fontSize="small" />
              Professional Background
            </Typography>
            <Divider className={successStyles.divider} />
            <Box className={successStyles.fieldsGrid}>
              {renderField("Job Title", professionalBackground.currentJobTitle)}
              {renderField("Company", professionalBackground.company)}
              {renderField("Industry", professionalBackground.industry)}
              {renderField(
                "Experience",
                professionalBackground.yearsOfExperience
                  ? `${professionalBackground.yearsOfExperience} years`
                  : "",
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

        <Box className={successStyles.actions}>
          <Button
            variant="outlined"
            onClick={handleEdit}
            className={successStyles.editButton}
            startIcon={<EditOutlinedIcon />}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={handleDelete}
            className={successStyles.removeButton}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Remove
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            className={successStyles.printButton}
            startIcon={<PrintOutlinedIcon />}
          >
            Print
          </Button>
          {/* <Button
            variant="outlined"
            onClick={handleClose}
            className={successStyles.closeButton}
            startIcon={<CloseOutlinedIcon />}
          >
            Close
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicantProfile;
