import { Box, TextField } from "@mui/material";

export default function SearchBar({ setSearch }) {
  return (
    <Box sx={{ px: 1, bgcolor: "background.paper" }}>
      <TextField
        label="Search Products"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ bgcolor: "background.paper" }}
      />
    </Box>
  );
}
