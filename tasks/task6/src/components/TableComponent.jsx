import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import styles from "./TableComponent.module.css";

const columns = [
  {
    field: "avatar",
    headerName: "Profile",
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Box className={styles.avatarCell}>
        <Avatar src={params.value} />
      </Box>
    ),
  },
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 400,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "creationAt",
    headerName: "Created",
    width: 280,
    headerAlign: "center",
    align: "center",
    valueGetter: (value) => new Date(value).toLocaleString(),
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 280,
    headerAlign: "center",
    align: "center",
    valueGetter: (value) => new Date(value).toLocaleString(),
  },
];

const paginationModel = { pageSize: 20 };

export default function TableComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Paper className={styles.tableContainer}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[20, 50, 100]}
        className={styles.dataGrid}
      />
    </Paper>
  );
}
