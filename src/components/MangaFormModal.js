"use client";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useState } from "react";
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

const emptyValues = { name: "", image: "", link: "", description: "" };

export default function MangaFormModal({ open, onClose, manga }) {
  const router = useRouter();
  const [statusSeverity, setStatusSeverity] = useState("error");
  const isEditing = Boolean(manga);

  const formik = useFormik({
    initialValues: manga
      ? {
          name: manga.name,
          image: manga.image,
          link: manga.link,
          description: manga.description ?? "",
        }
      : emptyValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus("");
      setStatusSeverity("error");

      const payload = {
        name: values.name.trim(),
        image: values.image.trim(),
        link: values.link.trim(),
        description: values.description.trim(),
      };

      try {
        const result = manga
          ? await supabase
              .from("mangas")
              .update(payload)
              .eq("id", manga.id)
              .select("id")
              .single()
          : await supabase.from("mangas").insert([payload]);

        if (result.error) {
          setStatus(
            result.error.code === "23505"
              ? "This manga link already exists."
              : result.error.message
          );
          return;
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setStatus(
            "Your changes were saved, but the manga list could not be refreshed. Reload the page in a minute to see them."
          );
          setStatusSeverity("warning");
          return;
        }

        const refreshResponse = await fetch("/api/mangas/revalidate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!refreshResponse.ok) {
          setStatus(
            "Your changes were saved, but the manga list could not be refreshed. Reload the page in a minute to see them."
          );
          setStatusSeverity("warning");
          return;
        }

        resetForm();
        onClose();
        router.refresh();
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Unable to save manga.");
      }
    },
  });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Manga" : "Add Manga"}
      status={formik.status}
      statusSeverity={statusSeverity}
      onSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitLabel={isEditing ? "Save Changes" : "Add Manga"}
      submittingLabel={isEditing ? "Saving..." : "Adding..."}
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

MangaFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  manga: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

MangaFormModal.defaultProps = {
  manga: null,
};
