"use client";
import { use, Suspense } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import supabase from "@/lib/supabase";

const mangasPromise = supabase
  .from("mangas")
  .select("id, name, image, link")
  .then(({ data }) => data ?? []);

function MangaList() {
  const mangas = use(mangasPromise);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        margin: '34px',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mangas.map((manga) => (
        <Card key={manga.id} sx={{ width: 300, height: 400, margin: "16px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={manga.image}
              alt={manga.name}
              onClick={() => {
                window.location.href = manga.link;
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {manga.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MangaList />
    </Suspense>
  );
}
