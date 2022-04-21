import React, { useEffect, useState } from "react";
import "./sidebar.css";

import MenuItem from "./MenuItem";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import HomeIcon from "@mui/icons-material/Home";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MailIcon from "@mui/icons-material/Mail";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { useLocation } from "react-router-dom";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing

export const menuItems = [
  {
    name: "ໜ້າຫຼັກ",
    exact: true,
    to: "/",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    name: "ຈັດການຂໍ້ມູນພຶ້ນຖານ",
    exact: true,
    to: "",
    icon: <ApartmentIcon fontSize="small" />,
    subMenus: [
      { name: "ລາຍການຈອງ", to: "/basic-manage/booking-list" },
      { name: "ລາຍການຫ້ອງທີ່ໃຊ້ງານ", to: "/basic-manage/active-room" },
    ],
  },

  {
    name: "ບໍລິການ",
    exact: true,
    to: ``,
    icon: <RecordVoiceOverIcon fontSize="small" />,
    subMenus: [
      { name: "ຈອງຫ້ອງລູກຄ້າ", to: "/basic-manage/booking-list" },
      { name: "ເຊັດອິນ (Check-in)", to: "/basic-manage/active-room" },
    ],
  },
  {
    name: "ອອກລາຍງານ",
    exact: true,
    to: `/report`,
    icon: <DriveFileRenameOutlineIcon fontSize="small" />,
  },
  {
    name: "ການແຈ້ງການ",
    exact: true,
    to: `/notification`,
    icon: <MailIcon fontSize="small" />,
    num: "",
  },
];

const SideMenu = (props) => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  /*const toggle = ()=> {setActive(!active)}*/


  return (
    <div className={`side-menu ${active ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src="/logo512.png" alt="logo" />
        </div>
        <div onClick={() => setActive(!active)} className="toggle-menu-btn">
          {active ? (
            <NavigateNextIcon fontSize="large" />
          ) : (
            <NavigateBeforeIcon fontSize="large" />
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              num={menuItem.num}
              subMenus={menuItem.subMenus || []}
              icon={menuItem.icon}
              onClick={(e) => {
                if (active) {
                  setActive(false);
                }
              }}
              to={
                menuItem.subMenus ? () => location.pathname : () => menuItem.to
              }
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer"></div>
    </div>
  );
};

export default SideMenu;
