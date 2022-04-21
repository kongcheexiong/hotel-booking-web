import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./sideNav.css";
import { router } from "../constants";
//icon
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import logo from "../logo.svg";
import { Stack } from "@mui/material";

const sideNavData = [
  {
    name: "Dashboard",
    icon: <AccountBalanceIcon />,
    router: `${router.DASHBOARD}`,
  },
  {
    name: "Shop",
    icon: "",
    router: `${router.SHOPS}`,
  },
  {
    name: "Service",
    icon: "",
    router: `${router.SERVICES}`,
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

            <h1>finder Service</h1>
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
                      color:
                        location.pathname.split("/")[1] ===
                        data?.router.split("/")[1]
                          ? "#00ADFF"
                          : "#898989",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <div>{data?.icon}</div>
                      <div>{data?.name}</div>
                    </Stack>
                  </a>
                );
              })}
            </div>
            <div>
              <a>fdsg</a>
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
