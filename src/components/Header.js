"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/lib/supabase";
import styles from "./Header.module.css";

const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });
const AddMangaModal = dynamic(() => import("./AddMangaModal"), { ssr: false });

export default function Header() {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const preloadLoginModal = () => {
    if (typeof LoginModal.preload === "function") LoginModal.preload();
  };

  const preloadAddModal = () => {
    if (typeof AddMangaModal.preload === "function") AddMangaModal.preload();
  };

  return (
    <>
      <AppBar position="sticky" className={styles.headerBar} elevation={0}>
        <Toolbar className={styles.headerToolbar}>
          <Box className={styles.brandBlock}>
            <Typography variant="h6" className={styles.headerTitle}>
              MangaBerns
            </Typography>
          </Box>
          <Box className={styles.headerActions}>
            {user ? (
              <>
                <Button
                  className={styles.headerButton}
                  onMouseEnter={preloadAddModal}
                  onFocus={preloadAddModal}
                  onClick={() => setAddOpen(true)}
                >
                  + Add Manga
                </Button>
                <Button className={styles.headerGhostButton} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className={styles.headerButton}
                onMouseEnter={preloadLoginModal}
                onFocus={preloadLoginModal}
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {loginOpen && <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />}
      {user && addOpen && (
        <AddMangaModal open={addOpen} onClose={() => setAddOpen(false)} />
      )}
    </>
  );
}
