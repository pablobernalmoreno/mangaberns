import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MangaCard from "./MangaCard";
import styles from "./MangaGrid.module.css";

export default function MangaGrid({ mangas }) {
  const mangaCount = mangas.length;

  return (
    <Container maxWidth="xl" className={styles.mangaGridContainer}>
      <Box className={styles.mangaHero}>
        <Typography variant="h2" component="h1" className={styles.mangaGridTitle}>
          My Ongoing Reads
        </Typography>
        <Typography component="p" className={styles.mangaGridSubtitle}>
          My private shelf for manga and webcomics I am currently reading as new chapters
          release. Click any card to open the source and stay current.
        </Typography>
        <Box className={styles.mangaStatBadge}>{mangaCount} active reads</Box>
      </Box>

      <Box className={styles.mangaGrid}>
        {mangaCount === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h5" component="p" className={styles.emptyTitle}>
              My list is empty
            </Typography>
            <Typography component="p" className={styles.emptyBody}>
              Add my first manga from the top-right action to start tracking
              my ongoing reads.
            </Typography>
          </Box>
        ) : (
          mangas.map((manga, index) => (
            <MangaCard key={manga.id} manga={manga} index={index} />
          ))
        )}
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
