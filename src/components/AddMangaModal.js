"use client";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "@/lib/supabase";
import styles from "./Modal.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Title is required"),
  image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  link: Yup.string().url("Must be a valid URL").required("Manga link is required"),
  description: Yup.string(),
});

export default function AddMangaModal({ open, onClose }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: "", image: "", link: "", description: "" },
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      const { error } = await supabase.from("mangas").insert([values]);
      if (error) {
        setStatus(error.message);
      } else {
        resetForm();
        onClose();
        router.refresh();
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalBox}>
        <Typography variant="h6" className={styles.modalTitle}>
          Add Manga
        </Typography>
        {formik.status && (
          <Alert severity="error" className={styles.modalAlert}>
            {formik.status}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            label="Title"
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            className={styles.modalField}
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            required
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            className={styles.modalField}
          />
          <TextField
            name="link"
            label="Manga Link"
            fullWidth
            required
            value={formik.values.link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.link && Boolean(formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
            className={styles.modalField}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            className={styles.modalField}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Adding..." : "Add Manga"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

AddMangaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
