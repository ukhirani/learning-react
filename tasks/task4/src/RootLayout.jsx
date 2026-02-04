import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  const [search, setSearch] = useState("");

  return (
    <Box className={styles.root}>
      <Navbar search={search} setSearch={setSearch} />
      <Box className={styles.main}>
        <Outlet context={{ search, setSearch }} />
      </Box>
    </Box>
  );
}
