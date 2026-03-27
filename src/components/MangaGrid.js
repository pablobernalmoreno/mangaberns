"use client";
import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MangaCard from "./MangaCard";
import styles from "./MangaGrid.module.css";

export default function MangaGrid({ mangas }) {
  return (
    <Container maxWidth="xl" className={styles.mangaGridContainer}>
      <Typography variant="h4" component="h1" className={styles.mangaGridTitle}>
        My Manga List
      </Typography>
      <Box className={styles.mangaGrid}>
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </Box>
    </Container>
  );
}

MangaGrid.propTypes = {
  mangas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};
