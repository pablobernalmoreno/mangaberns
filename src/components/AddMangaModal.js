"use client";
import { useState } from "react";
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
import supabase from "@/lib/supabase";
import "./Modal.css";

const emptyForm = { name: "", image: "", link: "", description: "" };

export default function AddMangaModal({ open, onClose }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.from("mangas").insert([form]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onClose();
      setForm(emptyForm);
      router.refresh();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography variant="h6" className="modal-title">
          Add Manga
        </Typography>
        {error && (
          <Alert severity="error" className="modal-alert">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Title"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
            className="modal-field"
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            required
            value={form.image}
            onChange={handleChange}
            className="modal-field"
          />
          <TextField
            name="link"
            label="Manga Link"
            fullWidth
            required
            value={form.link}
            onChange={handleChange}
            className="modal-field"
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="modal-field"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Manga"}
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
