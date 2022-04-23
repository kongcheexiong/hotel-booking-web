import React from "react";
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
import { Stack } from "@mui/material";
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
    name: "Dashboard",
    icon: <EqualizerIcon fontSize="small" />,
    router: `${router.DASHBOARD}`,
  },
  {
    name: "Shop",
    icon: <HomeRepairServiceIcon fontSize="small" />,
    router: `${router.SHOPS}`,
  },
  {
    name: "Service",
    icon: <BuildIcon fontSize="small" />,
    router: `${router.SERVICES}`,
  },
  {
    name: "Order",
    icon: <ArticleIcon fontSize="small" />,
    router: `${router.ORDER}`,
  },
  {
    name: "Payment",
    icon: <PaymentIcon fontSize="small" />,
    router: `${router.PAYMENT}`,
  },
  {
    name: "Invoice",
    icon: <DescriptionIcon fontSize="small" />,
    router: `${router.INVOICE}`,
  },
  {
    name: "Notification",
    icon: <NotificationsIcon fontSize="small" />,
    router: `${router.NOTIFICATION}`,
  },
  {
    name: "Customer",
    icon: <BadgeIcon fontSize="small" />,
    router: `${router.CUSTOMER}`,
  },
  {
    name: "Setting",
    icon: <SettingsIcon fontSize="small" />,
    router: `${router.SETTING}`,
  },
];

const SideNav = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <ul>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "5px",
              alignItems: "center",
            }}
          >
            <img src="../IMG.JPG" alt="img" height={50} />

            <h1 style={{ color: "rgba(27, 21, 76, 1)" }}>finder Service</h1>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "80%",
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
                          ? `rgba(255, 255, 255, 1)`
                          : "#F8F9FA",
                      borderRadius: "12px",
                      
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <div>{data?.icon}</div>
                      <div>{data?.name}</div>
                    </Stack>
                  </a>
                );
              })}
            </div>
            <div>
              <a>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <div>
                    <LogoutIcon fontSize="small" />
                  </div>
                  <div>Logout</div>
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
      <div style={{ marginLeft: "300px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
