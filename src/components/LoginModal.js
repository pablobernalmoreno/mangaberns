"use client";
import {
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "@/lib/supabase";
import FormModal from "./FormModal";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginModal({ open, onClose }) {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      const { email, password } = values;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus(error.message);
      } else {
        resetForm();
        onClose();
      }
    },
  });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Login"
      status={formik.status}
      onSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitLabel="Login"
      submittingLabel="Logging in..."
    >
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
      />
    </FormModal>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
