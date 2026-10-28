"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PropTypes from "prop-types";
import { useAuth } from "@/context/AuthContext";
import styles from "./MangaCard.module.css";

const MangaFormModal = dynamic(() => import("./MangaFormModal"), { ssr: false });

export default function MangaCard({ manga, index }) {
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const isFirstCard = index === 0;
  const description =
    manga.description?.trim() && manga.description.length > 200
      ? manga.description.slice(0, 200) + "..."
      : manga.description || "No description available.";

  return (
    <Card
      className={styles.mangaCard}
      style={{ "--card-delay": `${Math.min(index * 60, 420)}ms` }}
    >
      <Box
        component="a"
        href={manga.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${manga.name} (opens in a new tab)`}
        className={styles.mangaCardLink}
      >
        <Box className={styles.mangaCardImageWrapper}>
          <Image
            src={manga.image}
            alt={manga.name}
            fill
            className={styles.mangaCardImage}
            loading={isFirstCard ? "eager" : "lazy"}
            sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, (max-width: 1400px) 25vw, 20vw"
          />
          <Box className={styles.imagePanelOverlay} />
          <span className={styles.openBadge} aria-hidden="true">
            ↗
          </span>
        </Box>

        <CardContent className={styles.mangaCardContent}>
          <Typography variant="h6" component="h2" className={styles.mangaCardTitle}>
            {manga.name}
          </Typography>
          <Typography variant="body2" className={styles.mangaCardDescription}>
            {description}
          </Typography>
        </CardContent>
      </Box>

      {user && (
        <IconButton
          className={styles.editButton}
          aria-label={`Edit ${manga.name}`}
          title={`Edit ${manga.name}`}
          onClick={() => setEditOpen(true)}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      {user && editOpen && (
        <MangaFormModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          manga={manga}
        />
      )}
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
  index: PropTypes.number,
};

MangaCard.defaultProps = {
  index: 0,
};
