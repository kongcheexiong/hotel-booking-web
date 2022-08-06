import { Stack } from "@mui/material";
import React from "react";
import { format } from 'date-fns'

import { PrintContext } from "../../../context/print.context";
import { CheckInContextContext } from "../../../context/checkin.context";

export class PrintComponent extends React.PureComponent {
  static contextType = CheckInContextContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { state, setState } = this.context;
    // console.log('========>', this.context);
    const roomTypes = this.context.CheckInContext;
    return (
      <div
        style={{
          margin: "20mm 16mm 20mm 16mm",
          display: "flex",
          flexDirection: "column",
          fontSize: "14px",
          rowGap: "15px",
        }}
      >
        {/**header */}
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <img
            style={{ borderRadius: "20px" }}
            src="../../../img.PNG"
            alt="img"
            height={80}
          />
          <h3>BanHao Hotel Booking </h3>
        </Stack>
        <Stack>
          <span>ໂຮງແຮມ: {localStorage.getItem("hotelName")}</span>
          <span>ຜູ້ລາຍງານ: {localStorage.getItem("userName")}</span>
          <span>ວັນທີລາຍງານ: {format(new Date(), "dd/MM/yyyy")}</span>
        </Stack>
        {/**table */}
        <div>
          <h4>ລາຍງານຂໍ້ມູນແຈ້ງເຂົ້າ-ແຈ້ງອອກ</h4>
          <table>
            <thead>
              <th>ລໍາດັບ</th>
              <th>ຊື່ ແລະ ນາມສະກຸນ</th>

              <th>ຫ້ອງ</th>
              <th>ເບີໂທລະສັບ</th>
              <th>ເອກະສານອ້າງອິງ</th>
              <th>ເລກທີ</th>
              <th>ໄລຍະພັກເຊົາ</th>
              <th>ແຈ້ງອອກ</th>
              <th>ຈ່າຍແລ້ວ</th>

            </thead>
            <tbody>
              {roomTypes?.map((val, index) => {
                //const date = format(new Date(val.birthday), 'dd-MM-yyyy')
                return (
                  <tr key={index}>
                    <td align="center">{index + 1}</td>
                    <td>{val?.gender} {val?.firstName}  {val?.lastName}</td>
                    <td>{val?.room?.roomName}</td>
                    <td>{val?.phone}</td>
                    <td>{val?.reference}</td>

                    <td>{val?.verify}</td>
                    <td>{format(new Date(val?.checkInDate), 'dd/MM/yyyy')} - {format(new Date(val?.checkOutDate), 'dd/MM/yyyy')}</td>
                    <td>{val?.isCheckOut.toString()}</td>
                    <td>{val?.isPaid.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
