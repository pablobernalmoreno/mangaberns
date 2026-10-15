import Image from "next/image";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./MangaCard.module.css";

export default function MangaCard({ manga, index }) {
  const isFirstCard = index === 0;
  const description =
    manga.description?.trim() && manga.description.length > 200
      ? manga.description.slice(0, 200) + "..."
      : manga.description || "No description available.";

  return (
    <Card
      component="a"
      href={manga.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${manga.name} (opens in a new tab)`}
      className={styles.mangaCard}
      style={{ "--card-delay": `${Math.min(index * 60, 420)}ms` }}
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
