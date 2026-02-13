import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  name,
  setName,
  roles,
  setRoles,
  roleOptions,
}) {
  return (
    <Box className={styles.filterBar}>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.textField}
      />
      <Autocomplete
        multiple
        options={roleOptions}
        value={roles}
        onChange={(e, newValue) => setRoles(newValue)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
              className={styles.chip}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Filter by Role(s)"
            placeholder="Type and press Enter"
            className={styles.autocomplete}
          />
        )}
        className={styles.autocomplete}
      />
    </Box>
  );
}
