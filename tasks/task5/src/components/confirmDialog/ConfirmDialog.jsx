import { Box, Button, Modal, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useFormContext } from "../../context/FormContext";
import styles from "./confirmDialog.module.css";

const ConfirmDialog = () => {
  const { confirmOpen, confirmMessage, onConfirmOk, onConfirmCancel } =
    useFormContext();

  return (
    <Modal open={confirmOpen} onClose={onConfirmCancel}>
      <Box className={styles.container}>
        <Box className={styles.body}>
          <Box className={styles.iconWrapper}>
            <HelpOutlineIcon className={styles.icon} />
          </Box>
          <Typography className={styles.message}>{confirmMessage}</Typography>
        </Box>
        <Box className={styles.actions}>
          <Button
            variant="outlined"
            onClick={onConfirmCancel}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirmOk}
            className={styles.confirmButton}
            disableElevation
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDialog;
