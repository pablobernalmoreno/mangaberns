"use client";
import { Box, Container, Typography } from "@mui/material";
import MangaCard from "./MangaCard";

export default function MangaGrid({ mangas }) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: { xs: 3, md: 5 }, textAlign: "center", fontWeight: "bold" }}
      >
        My Manga List
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2, md: 3 },
        }}
      >
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </Box>
    </Container>
  );
}
