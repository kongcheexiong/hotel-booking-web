import { Stack } from "@mui/material";
import React from "react";
import {format} from 'date-fns'

import { PrintContext } from "../../../context/print.context";
import { roomContext } from "../../../context/room.context";
export class PrintComponent extends React.PureComponent {
  static contextType = roomContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { state, setState } = this.context;
    console.log(this.context);
    const rooms = this.context.room;
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
          <h4>ລາຍງານຂໍ້ມູນຫ້ອງທັງໝົດ</h4>
          <table>
            <thead>
            <th>ລໍາດັບ</th>
              <th>ເບີຫ້ອງ</th>
              
              <th>ປະເພດຫ້ອງ</th>
              <th>ໝາຍເຫດ</th>
              <th>ວັນທີສ້າງລາຍການ</th>
              <th>ສະຖານະການໃຊ້ງານ</th>
            
              
            </thead>
            <tbody>
              {rooms?.map((val, index) => {
                //const date = format(new Date(val.birthday), 'dd-MM-yyyy')
                return (
                  <tr key={index}>
                    <td align="center">{index+1}</td>
                    <td>{val.roomName}</td>
                    <td>{val.roomType.typeName}</td>
                    <td>{val.note}</td>
                    <td>{val.updatedAt}</td>

                    <td>{
                      val.status? <span>ບໍ່ຫວ່່າງ</span> : <span>ຫວ່່າງ</span>
                      }</td>
                   
                    
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
