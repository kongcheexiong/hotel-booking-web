import { Stack } from "@mui/material";
import React from "react";
import { format } from 'date-fns'

import { PrintContext } from "../../../context/print.context";
import { BookingContext } from "../../../context/booking.context";

export class PrintComponent extends React.PureComponent {
  static contextType = BookingContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { state, setState } = this.context;
     console.log('========>', this.context);
    const roomTypes = this.context.bookingContext;
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
          <h4>ລາຍງານຂໍ້ມູນການຈອງອອນໄລ໌ຂອງລູກຄ້າ</h4>
          <table>
            <thead>
              <th>ລໍາດັບ</th>
            

              <th>ເບີໂທລະສັບ</th>
              <th>ປະເພດຫ້ອງ</th>
              <th>ຈໍານວນ</th>
              <th>ວັນທີ່ຈະແຈ້ງເຂົ້າ</th>
              <th>ສະຖານະ</th>
          
            </thead>
            <tbody>
              {roomTypes?.map((val, index) => {
                //const date = format(new Date(val.birthday), 'dd-MM-yyyy')
                return (
                  <tr key={index}>
                    <td align="center">{index + 1}</td>
                    
                    <td>{val?.customerPhone}</td>
                   
                    <td>{val?.roomType.typeName}</td>

                    <td>{val?.quantity}</td>
                    <td>{format(new Date(val?.checkInDate), 'dd/MM/yyyy')}</td>
                    <td>{val?.status}</td>
                  
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
