"use client";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "@/lib/supabase";
import "./Modal.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginModal({ open, onClose }) {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) {
        setStatus(error.message);
      } else {
        resetForm();
        onClose();
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="modal-title">
          Login
        </Typography>
        {formik.status && (
          <Alert severity="error" className="modal-alert">
            {formik.status}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className="modal-field"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className="modal-field"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
