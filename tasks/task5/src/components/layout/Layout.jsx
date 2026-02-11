import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <Box className={styles.root}>
      <Sidebar />
      <Box className={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
