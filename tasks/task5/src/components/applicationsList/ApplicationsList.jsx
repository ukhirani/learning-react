import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useFormContext } from "../../context/FormContext";
import styles from "./applicationsList.module.css";
import { useNavigate } from "react-router-dom";

export default function ApplicationsList() {
  const { applications } = useFormContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("sno-asc");

  const handleRowClick = (id) => {
    navigate(`/applications/${id}`);
  };

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    let list = applications.map((entry, index) => ({
      ...entry,
      index,
    }));

    if (query) {
      list = list.filter((entry) => {
        const personal = entry.data?.personalDetails || {};
        const fullName = [personal.firstName, personal.lastName]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return fullName.includes(query);
      });
    }

    const getFullName = (entry) => {
      const personal = entry.data?.personalDetails || {};
      return [personal.firstName, personal.lastName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    };

    const getSubmittedAt = (entry) =>
      entry.submittedAt ? new Date(entry.submittedAt).getTime() : 0;

    const getUpdatedAt = (entry) =>
      entry.updatedAt ? new Date(entry.updatedAt).getTime() : 0;

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case "sno-desc":
          return b.index - a.index;
        case "name-asc":
          return getFullName(a).localeCompare(getFullName(b));
        case "name-desc":
          return getFullName(b).localeCompare(getFullName(a));
        case "date-asc":
          return getSubmittedAt(a) - getSubmittedAt(b);
        case "date-desc":
          return getSubmittedAt(b) - getSubmittedAt(a);
        case "updated-asc":
          return getUpdatedAt(a) - getUpdatedAt(b);
        case "updated-desc":
          return getUpdatedAt(b) - getUpdatedAt(a);
        case "sno-asc":
        default:
          return a.index - b.index;
      }
    });

    return sorted;
  }, [applications, searchTerm, sortBy]);

  return (
    <Box className={styles.card}>
      <Box className={styles.controls}>
        <TextField
          size="small"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={styles.searchInput}
        />
        <TextField
          select
          size="small"
          label="Sort by"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className={styles.sortSelect}
        >
          <MenuItem value="sno-asc">S.No: Low to High</MenuItem>
          <MenuItem value="sno-desc">S.No: High to Low</MenuItem>
          <MenuItem value="name-asc">Full Name: A to Z</MenuItem>
          <MenuItem value="name-desc">Full Name: Z to A</MenuItem>
          <MenuItem value="date-asc">Submitted On: Oldest</MenuItem>
          <MenuItem value="date-desc">Submitted On: Newest</MenuItem>
          <MenuItem value="updated-asc">Updated On: Oldest</MenuItem>
          <MenuItem value="updated-desc">Updated On: Newest</MenuItem>
        </TextField>
      </Box>

      <Box className={styles.tableWrapper}>
        {filteredApplications.length === 0 ? (
          <Typography className={styles.emptyText}>
            No submissions found.
          </Typography>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>S.No</th>
                <th className={styles.th}>Full Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Submitted On</th>
                <th className={styles.th}>Updated On</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((entry, index) => {
                const personal = entry.data?.personalDetails || {};
                const fullName = [personal.firstName, personal.lastName]
                  .filter(Boolean)
                  .join(" ");
                const email = personal.email || "-";
                let submittedAt = entry.submittedAt
                  ? new Date(entry.submittedAt).toLocaleDateString("en-GB")
                  : "-";
                if (
                  new Date(entry.submittedAt).toDateString() ===
                  new Date().toDateString()
                ) {
                  submittedAt =
                    new Date(entry.submittedAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }) + " (Today)";
                }

                let updatedAt = entry.updatedAt
                  ? new Date(entry.updatedAt).toLocaleDateString("en-GB")
                  : "-";
                if (
                  new Date(entry.updatedAt).toDateString() ===
                  new Date().toDateString()
                ) {
                  updatedAt =
                    new Date(entry.updatedAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }) + " (Today)";
                }

                return (
                  <tr
                    key={entry.id}
                    className={styles.row}
                    onClick={() => handleRowClick(entry.id)}
                  >
                    <td className={styles.td}>
                      {sortBy === "sno-desc"
                        ? filteredApplications.length - index
                        : index + 1}
                    </td>
                    <td className={styles.td}>{fullName}</td>
                    <td className={styles.td}>{email}</td>
                    <td className={styles.td}>{submittedAt}</td>
                    <td className={styles.td}>{updatedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  );
}
