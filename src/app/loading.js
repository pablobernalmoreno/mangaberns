"use client";
import { Box, Container, Skeleton } from "@mui/material";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <Container maxWidth="xl" className={styles.loadingContainer}>
      <Skeleton variant="text" className={styles.loadingTitle} />
      <Box className={styles.loadingGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i}>
            <Skeleton variant="rectangular" className={styles.loadingCardImage} />
            <Skeleton variant="text" className={styles.loadingCardTitle} />
            <Skeleton variant="text" className={styles.loadingCardSubtitle} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
