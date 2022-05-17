import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Chip } from "@mui/material";

const cellStyle = {
  fontFamily: "Noto Sans Lao",
  backgroundColor: "",
  padding: '6px 10px',
 

  borderWidth: 1,
  borderColor: "#F8F9FA",
  borderStyle: "solid",
};
const cellStyleHeader = {
  fontFamily: "Noto Sans Lao",
  padding: '5px 10px',
  color: "white",
  borderWidth: 1,
  borderColor: "",
  borderStyle: "solid",
};

const columns = [
  { id: "choice", label: "ຕົວເລືອກ", minWidth: 170 },
  { id: "id", label: "ລະຫັດ", minWidth: 100 },
  {
    id: "roomNumber",
    label: "ເບີຫ້ອງ",
    minWidth: 170,
    align: "right",
  },
  {
    id: "type",
    label: "ປະເພດຫ້ອງ",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "ສະຖານະ",
    minWidth: 170,
    align: "right",
  },
];

function createData(choice, id, roomNumber, type, status) {
  return { choice, id, roomNumber, type, status };
}

const rows = [
  createData("", "1", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "2", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "3", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "4", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "5", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "6", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "7", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "8", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "9", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "10", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "11", "FA001", "VIP 1", "ຫວ່າງ"),
  createData("", "12", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "13", "FA001", "VIP 1", "ບໍຫວ່າງ"),
  createData("", "14", "FA001", "VIP 1", "ບໍຫວ່າງ"),
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
            <TableRow  sx={{ backgroundColor: "#1565C0", }}>
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
                          {" "}
                          {column.id === "status" ? (
                            value === "ຫວ່າງ" ? (
                              <Chip sx={{  fontFamily: "Noto Sans Lao", width: '60px'}}
                                color="success"
                                variant=""
                                label={`${value}`}
                              />
                            ) : (
                              <Chip sx={{  fontFamily: "Noto Sans Lao", width: '60px'}} color="error" label={`${value}`} />
                            )
                          ) : (
                            value
                          )}
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
