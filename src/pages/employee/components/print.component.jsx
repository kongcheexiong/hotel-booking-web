import { Stack } from "@mui/material";
import React from "react";
import {format} from 'date-fns'

import { PrintContext } from "../../../context/print.context";
import { EmployeeContext } from "../../../context/employee.context";

export class PrintComponent extends React.PureComponent {
  static contextType = EmployeeContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { state, setState } = this.context;
    console.log(this.context);
    const users = this.context.Employee;
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
        <Stack>
          <span>ໂຮງແຮມ: {localStorage.getItem("hotelName")}</span>
          <span>ຜູ້ລາຍງານ: {localStorage.getItem("userName")}</span>
          <span>ວັນທີລາຍງານ: {format(new Date(), "dd/MM/yyyy")}</span>
        </Stack>
        {/**table */}
        <div>
          <h4>ລາຍງານຂໍ້ມູນພະນັກງານ</h4>
          <table>
            <thead>
            <th>ລໍາດັບ</th>

              <th>ເພດ</th>
              <th>ຊື່</th>
              <th>ນາມສະກຸນ</th>
              <th>ວັນເດືອນປີເກີດ</th>
              <th>ບ້ານ</th>
              <th>ເມືອງ</th>
              <th>ແຂວງ</th>
              <th>ເບີໂທລະສັບ</th>
              <th>ສະຖານະ</th>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                const date = format(new Date(user.birthday), 'dd-MM-yyyy')
                return (
                  <tr key={index}>
                    <td align="center">{index+1}</td>
                    <td align="center">{user.gender === 'MALE' ? <span>{'ທ້າວ'}</span>: <span>{'ນາງ'}</span>}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td align="center">{date}</td>
                    <td>{user.village}</td>

                    <td>{user.city}</td>
                    <td>{user.province}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
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
