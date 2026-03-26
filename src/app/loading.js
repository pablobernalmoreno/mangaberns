"use client";
import { Box, Container, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Skeleton
        variant="text"
        width={200}
        height={48}
        sx={{ mx: "auto", mb: { xs: 3, md: 5 } }}
      />
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i}>
            <Skeleton variant="rectangular" sx={{ paddingTop: "75%" }} />
            <Skeleton variant="text" sx={{ mt: 1 }} height={32} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
