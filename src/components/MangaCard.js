"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./MangaCard.module.css";

export default function MangaCard({ manga }) {
  return (
    <Card
      component={Link}
      href={manga.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mangaCard}
    >
      <Box className={styles.mangaCardImageWrapper}>
        <Image
          src={manga.image}
          alt={manga.name}
          fill
          className={styles.mangaCardImage}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </Box>
      <CardContent className={styles.mangaCardContent}>
        <Typography gutterBottom variant="h6" component="h2">
          {manga.name}
        </Typography>
        {manga.description && (
          <Typography variant="body2" color="text.secondary">
            {manga.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

MangaCard.propTypes = {
  manga: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};
