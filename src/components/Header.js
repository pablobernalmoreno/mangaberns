"use client";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/lib/supabase";
import LoginModal from "./LoginModal";
import AddMangaModal from "./AddMangaModal";
import "./Header.css";

export default function Header() {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <AppBar position="sticky" className="header">
        <Toolbar>
          <Typography variant="h6" className="header-title">
            MangaBerns
          </Typography>
          {user ? (
            <Box className="header-actions">
              <Button color="inherit" onClick={() => setAddOpen(true)}>
                + Add Manga
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      {user && (
        <AddMangaModal open={addOpen} onClose={() => setAddOpen(false)} />
      )}
    </>
  );
}
