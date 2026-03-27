"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  return (
    <Container maxWidth="sm">
      <Box className={styles.errorContainer}>
        <Typography variant="h5" fontWeight="bold">
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error.message ?? "Failed to load manga list."}
        </Typography>
        <Button variant="contained" onClick={reset}>
          Try again
        </Button>
      </Box>
    </Container>
  );
}
