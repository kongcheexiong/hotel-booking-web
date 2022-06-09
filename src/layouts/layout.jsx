import * as react from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./sideNav.css";
import { router } from "../constants";
//COLOR
import { color } from "../constants";
//import component
import ImgContainer from "../components/ImgContainer";
//icon
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import logo from "../logo.svg";
import { Avatar, Badge, IconButton, Stack } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BuildIcon from "@mui/icons-material/Build";
import ArticleIcon from "@mui/icons-material/Article";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BadgeIcon from "@mui/icons-material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import GradingIcon from "@mui/icons-material/Grading";

import KingBedIcon from "@mui/icons-material/KingBed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SummarizeIcon from "@mui/icons-material/Summarize";

import { authContext, authInitialValue } from "../context/authContext";

const myIcon = (img, title) => {
  return (
    <ImgContainer myHeight="50px" myWidth="50px" myBorderRadius="10px">
      <img src={img} alt={title} height={15} />
    </ImgContainer>
  );
};

const myIcons = () => {
  return;
  <img src="../IMG.JPG" alt="img" height={50} />;
};

const sideNavData = [
  {
    name: "ໜ້າຫຼັກ",
    icon: <EqualizerIcon fontSize="small" />,
    router: `${router.DASHBOARD}`,
  },
  {
    name: "ຈັດການຂໍ້ມູນພະນັກງານ",
    icon: <BadgeIcon fontSize="small" />,
    router: `${router.EMPLOYEEMANAGEMENT}`,
  },
  {
    name: "ຈັດການຂໍ້ມູນປະເພດຫ້ອງ",
    icon: <KingBedIcon fontSize="small" />,
    router: `${router.ROOMTYPEMANAGEMENT}`,
  },
  {
    name: "ຈັດການຂໍ້ມູນຫ້ອງ",
    icon: <KingBedIcon fontSize="small" />,
    router: `${router.ROOMMAGEMENT}`,
  },
  {
    name: "ລາຍການຈອງ",
    icon: <MenuBookIcon fontSize="small" />,
    router: `${router.BOOKING}`,
  },
  {
    name: "ລາຍການເຊັດອິນ",
    icon: <GradingIcon fontSize="small" />,
    router: `${router.CHECKIN}`,
  },
  {
    name: "ລາຍງານ",
    icon: <SummarizeIcon fontSize="small" />,
    router: `${router.REPORT}`,
  },
];

const SideNav = () => {
  const navigate = useNavigate();
  //const {auth,setAuth } = react.useContext(authContext);

  return (
    <div>
      <nav>
        <ul>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px",
              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <img src="../IMG.JPG" alt="img" height={50} />

            <h1 style={{ color: "rgba(27, 21, 76, 1)" }}>Hotel Management</h1>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "70%",
            }}
          >
            <div>
              {sideNavData?.map((data, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => navigate(data?.router)}
                    style={{
                      backgroundColor:
                        location.pathname.split("/")[1] ===
                        data?.router.split("/")[1]
                          ? "#F8F9FA"
                          : `rgba(255, 255, 255, 1)`,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {data?.icon}
                      <div>{data?.name}</div>
                    </Stack>
                  </a>
                );
              })}
            </div>
            <div>
              <a>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <LogoutIcon fontSize="small" />
                  <div
                    onClick={() => {
                      localStorage.clear()
                      navigate(`/`)
                    }}
                  >
                    ອອກຈາກລະບົບ
                  </div>
                </Stack>
              </a>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

function Layout() {
  return (
    <div>
      <SideNav />
      <div style={{ marginLeft: "280px" }}>
        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={3}
          sx={{
            backgroundColor: "#F8F9FA",
            height: "60px",
            paddingRight: "50px",
          }}
        >
          <Stack direction="row-reverse" spacing={0} alignItems="center">
            {/**profile */}
            <IconButton>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>

            {/**name */}
            <span
              className="en"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              kongchee
            </span>
          </Stack>

          {/**notification */}
          <IconButton>
            <Badge color="secondary" badgeContent={12}>
              <NotificationsIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Stack>
        <div style={{ margin: "30px 30px", padding: "", backgroundColor: "" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
