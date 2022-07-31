import { Stack } from "@mui/material";
import React from "react";
import {format} from 'date-fns'

import { PrintContext } from "../../../context/print.context";
import { roomTypeContext } from "../../../context/roomType.context";

export class PrintComponent extends React.PureComponent {
  static contextType = roomTypeContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { state, setState } = this.context;
    console.log(this.context);
    const roomTypes = this.context.roomType;
    return (
      <div
        style={{
          margin: "20mm 16mm 20mm 16mm",
          display: "flex",
          flexDirection: "column",
          fontSize: "14px",
          rowGap: "30px",
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
        {/**table */}
        <div>
          <h4>ລາຍງານຂໍ້ມູນປະເພດຫ້ອງທັງໝົດ</h4>
          <table>
            <thead>
            <th>ລໍາດັບ</th>
              <th>ປະເພດຫ້ອງ</th>
              
              <th>ລາຄາ</th>
              <th>ຈໍານວນລູກຄ້າແນະນໍາ</th>
              <th>ຈໍານວນຕຽງ</th>
              <th>ຈໍານວນຫ້ອງທັງໝົດ</th>
              <th>ໝາຍເຫດ</th>
              
            </thead>
            <tbody>
              {roomTypes?.map((val, index) => {
                //const date = format(new Date(val.birthday), 'dd-MM-yyyy')
                return (
                  <tr key={index}>
                    <td align="center">{index+1}</td>
                    <td>{val.roomType?.typeName}</td>
                    <td>{val.roomType?.price}</td>
                    <td>{val.roomType?.suggestedGuestAllowed}</td>
                    <td>{val.roomType?.numberOfBed}</td>

                    <td>{val.totalRoom}</td>
                    <td>{val.roomType?.note}</td>
                    
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
