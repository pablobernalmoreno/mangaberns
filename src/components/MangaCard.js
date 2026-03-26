"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function MangaCard({ manga }) {
  return (
    <Card
      component={Link}
      href={manga.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", paddingTop: "75%" }}>
        <Image
          src={manga.image}
          alt={manga.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
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
