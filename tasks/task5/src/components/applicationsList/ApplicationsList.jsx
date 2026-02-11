import { Box, Typography } from "@mui/material";
import { useFormContext } from "../../context/FormContext";
import styles from "./applicationsList.module.css";

const ApplicationsList = () => {
  const { applications, selectApplication, setIsModalOpen } = useFormContext();

  const handleRowClick = (id) => {
    selectApplication(id);
    setIsModalOpen(true);
  };

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Typography className={styles.title}>Applications</Typography>
        <Typography className={styles.subtitle}>Submitted records</Typography>
      </Box>

      <Box className={styles.tableWrapper}>
        {applications.length === 0 ? (
          <Typography className={styles.emptyText}>
            No submissions yet.
          </Typography>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>S.No</th>
                <th className={styles.th}>Full Name</th>
                <th className={styles.th}>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((entry, index) => {
                const personal = entry.data?.personalDetails || {};
                const fullName = [personal.firstName, personal.lastName]
                  .filter(Boolean)
                  .join(" ");
                const submittedAt = entry.submittedAt
                  ? new Date(entry.submittedAt).toLocaleDateString()
                  : "-";
                return (
                  <tr
                    key={entry.id}
                    className={styles.row}
                    onClick={() => handleRowClick(entry.id)}
                  >
                    <td className={styles.td}>{index + 1}</td>
                    <td className={styles.td}>{fullName}</td>
                    <td className={styles.td}>{submittedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  );
};

export default ApplicationsList;
