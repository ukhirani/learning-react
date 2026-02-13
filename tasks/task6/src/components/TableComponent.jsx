import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import styles from "./TableComponent.module.css";
import FilterBar from "./FilterBar";

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
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        setLoading(false);
        setRoleOptions([...new Set(data.map(row => row.role))]);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter logic
  const filteredRows = rows.filter(row => {
    const nameMatch = row.name.toLowerCase().includes(name.toLowerCase());
    const roleMatch = roles.length === 0 || roles.includes(row.role);
    return nameMatch && roleMatch;
  });

  return (
    <Paper className={styles.tableContainer}>
      <FilterBar
        name={name}
        setName={setName}
        roles={roles}
        setRoles={setRoles}
        roleOptions={roleOptions}
      />
      <DataGrid
        rows={filteredRows}
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
