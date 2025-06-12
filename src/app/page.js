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
    title: "Berserk",
    image:
      "https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg",
    page: "https://www.natomanga.com/manga/berserk",
    id: 0,
  },
  {
    title: "Witch Hat Atelier",
    image:
      "https://cdn.shopify.com/s/files/1/0265/1088/4906/files/witch-hat-atelier-1-paperback-graphic-novels-351.webp",
    page: "https://witchhatateliermanga.com",
    id: 1,
  },
  {
    title: "More than Lovers less than Friends",
    image:
      "https://www.harum.io/cdn/shop/files/capture_20250120145642292.jpg?v=1746762714",
    page: "https://danke.moe/read/manga/more-than-lovers/",
    id: 2,
  },
  {
    title: "Whisper Me a Love Song",
    image:
      "https://m.media-amazon.com/images/I/71EoX6V+mnL.jpg",
    page: "https://www.natomanga.com/manga/whisper-me-a-love-song",
    id: 3,
  },
  {
    title: "Tales of Demons and Gods",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm8Xo_FtYRd6Ce_ZLx-lzZsqwjx_XwIzIUOw&s",
    page: "https://manhuaplus.com/manga/tales-of-demons-and-gods01/",
    id: 4,
  },
  {
    title: "Ancient Magus Bride",
    image:
      "https://cdnx.jumpseller.com/spookyhouse/image/2030700/resize/640/500?1649814341",
    page: "https://www.natomanga.com/manga/mahou-tsukai-no-yome",
    id: 5,
  },
  {
    title: "Goblin Slayer",
    image:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/1f/3f/1f3f8841403c7340c7320bc5288ee3fb.jpg",
    page: "https://www.natomanga.com/manga/goblin-slayer",
    id: 6,
  },
  {
    title: "Record of Ragnarok",
    image:
      "https://preview.redd.it/tlybkmyizdo81.jpg?width=1080&crop=smart&auto=webp&s=d69c12d833493f33546367a68476d78ac8b1cdcc",
    page: "https://www.natomanga.com/manga/record-of-ragnarok",
    id: 7,
  },
  {
    title: "Mieruko Chan",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Mieruko-chan_volume_1_cover.jpg",
    page: "https://www.natomanga.com/manga/mieruko-chan",
    id: 8,
  },
];

export default function Home() {
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
      {myMangas?.map((manga) => (
        <Card key={manga?.id} sx={{ width: 300, height: 400, margin: "16px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
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
