import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./sidebar.module.css";

const navItems = [
  { label: "Applications", path: "/", icon: <ListAltOutlinedIcon /> },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:900px)");

  const handleNav = (path) => {
    navigate(path);
    if (!isDesktop) setMobileOpen(false);
  };

  const drawerContent = (
    <Box className={styles.drawerInner}>
      <Box className={styles.brand}>
        <Typography className={styles.brandText}>
          Job Application Form
        </Typography>
        {!isDesktop && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            className={styles.closeBtn}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <List className={styles.navList}>
        {navItems.map((item, index) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                className={`${styles.navButton} ${active ? styles.navButtonActive : ""}`}
              >
                <ListItemIcon className={styles.navIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ className: styles.navLabel }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (isDesktop) {
    return (
      <Box component="nav" className={styles.permanentSidebar}>
        {drawerContent}
      </Box>
    );
  }

  return (
    <>
      <Box className={styles.topBar}>
        <IconButton
          onClick={() => setMobileOpen(true)}
          className={styles.menuBtn}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={styles.topBarTitle}>
          Job Application Form
        </Typography>
      </Box>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ className: styles.drawerPaper }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
