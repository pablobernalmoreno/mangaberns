"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const myMangas = [
  {
    title: "Witch Hat Atelier",
    image:
      "https://cdn.shopify.com/s/files/1/0265/1088/4906/files/witch-hat-atelier-1-paperback-graphic-novels-351.webp",
    page: "https://witchhatateliermanga.com",
    id: 0,
  },
  {
    title: "More than lovers less than friends",
    image:
      "https://www.harum.io/cdn/shop/files/capture_20250120145642292.jpg?v=1746762714",
    page: "https://danke.moe/read/manga/more-than-lovers/",
    id: 1,
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {myMangas?.map((manga) => (
        <Card key={manga?.id} sx={{ width: 300, height: 300, margin: "16px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={manga?.image}
              alt={manga?.title}
              onClick={() => {
                window.location.href = manga?.page;
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {manga?.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
