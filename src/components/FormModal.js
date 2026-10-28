"use client";
import { Modal, Box, Typography, Button, Alert } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

export default function FormModal({
  open,
  onClose,
  title,
  status,
  statusSeverity,
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  children,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalBox}>
        <Typography variant="h6" className={styles.modalTitle}>
          {title}
        </Typography>

        {status && (
          <Alert severity={statusSeverity} className={styles.modalAlert}>
            {status}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          {children}
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  statusSeverity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  submitLabel: PropTypes.string.isRequired,
  submittingLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FormModal.defaultProps = {
  status: "",
  statusSeverity: "error",
  isSubmitting: false,
};
