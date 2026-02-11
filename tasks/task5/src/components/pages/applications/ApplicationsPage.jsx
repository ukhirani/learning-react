import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ApplicationsList from "../../applicationsList/ApplicationsList";
import { useFormContext } from "../../../context/FormContext";
import styles from "./applicationsPage.module.css";

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const { clearFormData } = useFormContext();

  const handleNewApplication = () => {
    clearFormData();
    navigate("/");
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Box>
          <Typography className={styles.title}>Applications</Typography>
          <Typography className={styles.subtitle}>
            Manage all submitted applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewApplication}
          className={styles.newButton}
        >
          New
        </Button>
      </Box>
      <ApplicationsList />
    </Box>
  );
};

export default ApplicationsPage;
