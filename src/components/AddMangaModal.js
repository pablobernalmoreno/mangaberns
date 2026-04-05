"use client";
import {
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import supabase from "@/lib/supabase";
import FormModal from "./FormModal";

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
      const payload = {
        name: values.name.trim(),
        image: values.image.trim(),
        link: values.link.trim(),
        description: values.description.trim(),
      };

      const { error } = await supabase.from("mangas").insert([payload]);

      if (error) {
        if (error.code === "23505") {
          setStatus("This manga link already exists.");
        } else {
          setStatus(error.message);
        }
      } else {
        resetForm();
        onClose();
        router.refresh();
      }
    },
  });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Add Manga"
      status={formik.status}
      onSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitLabel="Add Manga"
      submittingLabel="Adding..."
    >
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
      />
    </FormModal>
  );
}

AddMangaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
