import { Box, TextField } from "@mui/material";
import styles from "./searchBar.module.css";

export default function SearchBar({ setSearch }) {
  return (
    <Box className={styles.wrapper}>
      <TextField
        placeholder="Search products"
        name="search"
        variant="outlined"
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{
          sx: {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            border: "1px solid #f0f0f0",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #16a34a",
            },
          },
        }}
      />
    </Box>
  );
}
