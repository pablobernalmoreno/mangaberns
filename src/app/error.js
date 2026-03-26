"use client";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Error({ error, reset }) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2,
          textAlign: "center",
        }}
      >
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
