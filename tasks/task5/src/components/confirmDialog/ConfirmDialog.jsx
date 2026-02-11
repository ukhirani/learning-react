import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styles from "./confirmDialog.module.css";

const ConfirmContext = createContext(null);

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error("useConfirm must be used within a ConfirmDialogProvider");
  }
  return confirm;
};

const ConfirmDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const resolveRef = useRef(null);

  const confirm = useCallback((msg = "Are you sure?") => {
    setMessage(msg);
    setOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    setOpen(false);
    resolveRef.current?.(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolveRef.current?.(false);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal open={open} onClose={handleCancel}>
        <Box className={styles.container}>
          <Box className={styles.body}>
            <Box className={styles.iconWrapper}>
              <HelpOutlineIcon className={styles.icon} />
            </Box>
            <Typography className={styles.message}>{message}</Typography>
          </Box>
          <Box className={styles.actions}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              className={styles.confirmButton}
              disableElevation
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </ConfirmContext.Provider>
  );
};

export default ConfirmDialogProvider;
