import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { jsx } from "@emotion/react";

const cellStyle = {
  fontFamily: "Noto Sans Lao",
  backgroundColor: "",
  padding: "5px 10px",

  borderWidth: 1,
  borderColor: "#F8F9FA",
  borderStyle: "solid",
};
const cellStyleHeader = {
  fontFamily: "Noto Sans Lao",
  padding: "5px 10px",
  color: "white",
  borderWidth: 1,
  borderColor: "",
  borderStyle: "solid",
};

const actionType = {
  edit: (id) => {
    //edit data
  },
  delete: (id) => {
    //delete data
  },
  view: (id) => {
    //view data
  },
};

const columns = [
  { id: "choice", label: "ຕົວເລືອກ", minWidth: 80 },
  { id: "id", label: "ລະຫັດ", minWidth: 30 },
  {
    id: "room",
    label: "ຫ້ອງ",
    minWidth: 40,
    align: "right",
  },
  {
    id: "price",
    label: "ລາຄາ (K)",
    minWidth: 70,
    align: "right",
  },
  {
    id: "numOfBed",
    label: "ຈໍານວນຕຽງ",
    minWidth: 80,
    align: "right",
  },
  {
    id: "numOfQuest",
    label: "ຈໍານວນລູກຄ້າແນະນໍາ",
    minWidth: 110,
    align: "right",
  },

  {
    id: "note",
    label: "ໝາຍເຫດ",
    minWidth: 60,
    align: "right",
  },
];

const CreateActionButton = () => {
  const icons = [<EditIcon />, <RemoveRedEyeIcon />, <DeleteIcon />];
  return (
    <div>
      {icons.map((icon, index) => {
        <IconButton>{icon}</IconButton>;
      })}
    </div>
  );
};

function createData(choice, id, room, price, numOfBed, numOfQuest, note) {
  return { choice, id, room, price, numOfBed, numOfQuest, note };
}


const rows = [
  createData(
    <CreateActionButton/>,
    "1",
    "VIP 1",
    "100,000 K",
    "2",
    "2",
    "ຫ້ອງແອ, ບໍລິການອາຫານເຊົ້າ"
  ),
  createData("", "2", "VIP 2", "200,000 K", "2", "3"),
  createData("", "3", "VIP 3", "300,000 K", "3", "3"),
];

export default function DataTables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1565C0" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ ...cellStyleHeader }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.id} hover>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ ...cellStyle }}
                          key={column.id}
                          align={column.align}
                        >
                          
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
