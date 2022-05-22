import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";


import { font } from "../../../constants/index";
import { datagridSx } from "../../../style";

export default function Table() {
    const [pageSize, setPageSize] = React.useState(10);
  const columns = [
    {
      field: "action",
      headerName: "ຕົວເລືອກ",
      width: 90,
      sortable: false,
      renderCell: (parram) => {
        return (
          <Stack direction= 'row' justifyContent='center'>
            <IconButton
              onClick={() => {
                console.log(parram.row);
                // console.log(resData)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log(parram.row);
                // console.log(resData)
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
    { field: "_id", headerName: "ລະຫັດ", width: 50 },
    { field: "userName", headerName: "ຜູ້ໃຊ້", flex: 1, sortable: false },
    { field: "image", headerName: "ຮູບ", flex: 1 },
    { field: "firstName", headerName: "ຊື່", flex: 1, sortable: false },
    { field: "lastName", headerName: "ນາມສະກຸນ", flex: 1, sortable: false },
    { field: "DateOfBirth", headerName: "ວັນເດືອນປີເກີດ", flex: 1, sortable: false },
    { field: "village", headerName: "ບ້ານ", flex: 1, sortable: false },
    { field: "city", headerName: "ເມືອງ", flex: 1, sortable: false },
    { field: "province", headerName: "ແຂວງ", flex: 1, sortable: false },
    { field: "phone", headerName: "ເບີໂທວະສັບ", flex: 1, sortable: false },
    { field: "role",headerName: "Role",width: 50,},
  ];

  const rows = [
    { _id: 1, userName: "F01", image: "img.png", firstName: 'ກົງຈີ',lastName: 'ຊົ່ງຕົງສື',DateOfBirth: '03/10/2000',village: 'ໂພນເຄັງ',city: 'ໄຊເສດຖາ',province: 'ນະຄອນຫຼວງວຽງຈັນ',phone: '23826684',role: 'Admin' },
  ];
 
  return (
    <div style={{ height: 660, width: "100%" }}>
          
          <DataGrid
            sx={{ ...datagridSx, marginTop: "10px" }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu
            getRowId={(row) => row._id}
          />
        </div>
  )
}
