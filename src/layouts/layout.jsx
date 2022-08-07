import * as react from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./sideNav.css";
import { router } from "../constants";
//COLOR
import { color, font, SERVER_URL } from "../constants";
//import component
import ImgContainer from "../components/ImgContainer";
//icon
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import logo from "../logo.svg";
import {
  Avatar,
  Badge,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
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
///
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

import GradingIcon from "@mui/icons-material/Grading";

import KingBedIcon from "@mui/icons-material/KingBed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SummarizeIcon from "@mui/icons-material/Summarize";

import { authContext, authInitialValue } from "../context/authContext";
import { notificationContext } from "../context/notification";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// io
import { io } from "socket.io-client";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import MapIcon from "@mui/icons-material/Map";
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';

const socket = io.connect(`${SERVER_URL}`, { transports: ["websocket"] });

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

function Layout() {
  const navigate = useNavigate();
  const hotelName = localStorage.getItem("hotelName");
  const userRole = localStorage.getItem("role");
  const hotelID = localStorage.getItem("hotel");

  const [open, setOpen] = react.useState(false);
  const [openService, setOpenService] = react.useState(false);

  const play = () => {
    var beepsound = new Audio(
      "https://www.soundjay.com/button/sounds/beep-01a.mp3"
    );
    //beepsound.play();
  };

  const { notification, setNotification } =
    react.useContext(notificationContext);

  const sideNavData = [
    {
      name: "ໜ້າຫຼັກ",
      icon: <EqualizerIcon fontSize="small" />,
      router: `${router.ADMIN_DASHBOARD}`,
      access: ["SYSTEM"],
    },

    {
      name: "ໜ້າຫຼັກ",
      icon: <EqualizerIcon fontSize="small" />,
      router: `${router.DASHBOARD}`,
      access: ["OWNER", "STAFF", "ADMIN"],
    },
    {
      name: "ຈັດການຂໍ້ມູນພະນັກງານ",
      icon: <PeopleAltIcon fontSize="small" />,
      router: `${router.EMPLOYEEMANAGEMENT}`,
      access: ["OWNER", "ADMIN"],
    },
    {
      name: "ຈັດການຂໍ້ມູນປະເພດຫ້ອງ",
      icon: <BedroomParentIcon fontSize="small" />,
      router: `${router.ROOMTYPEMANAGEMENT}`,
      access: ["OWNER", "ADMIN"],
    },
    {
      name: "ຈັດການຂໍ້ມູນຫ້ອງ",
      icon: <KingBedIcon fontSize="small" />,
      router: `${router.ROOMMAGEMENT}`,
      access: ["OWNER", "ADMIN"],
    },

    {
      name: "ຈອງຫ້ອງ",
      icon: <MenuBookIcon fontSize="small" />,
      router: `${router.HOTEL_BOOKING}`,
      access: ["OWNER", "STAFF", "ADMIN"],
    },

    {
      name: "ແຈ້ງເຂົ້າ",
      icon: <GradingIcon fontSize="small" />,
      router: `${router.CHECKIN}`,
      access: ["OWNER", "STAFF", "ADMIN"],
    },
    {
      name: "ລາຍການຈອງອອນໄລ",
      icon: <BookOnlineIcon fontSize="small" />,
      router: `${router.BOOKING}`,
      // Notification: notification,

      access: ["OWNER", "STAFF", "ADMIN"],
    },
    //{
    //  name: "ລາຍງານ",
    //  icon: <SummarizeIcon fontSize="small" />,
    //  router: `${router.REPORT}`,
    //  access: ["OWNER", "STAFF", "ADMIN"],
    //},
    ///{
    ///  name: "ແກ້ໄຂການຂໍ້ມູນໂຮງແຮມ",
    ///  icon: <SettingsIcon fontSize="small" />,
    ///  router: `${router.SETTING}`,
    ///  access: ["OWNER"],
    ///},
    {
      name: "ຈັດການຂໍ້ມູນໂຮງແຮມ",
      icon: <MapsHomeWorkIcon fontSize="small" />,
      router: `${router.ALL_HOTEL}`,
      access: ["SYSTEM"],
    },
    {
      name: "ແຜນທີ່ໂຮງແຮມ",
      icon: <MapIcon fontSize="small" />,
      router: `${router.MAP}`,
      access: ["SYSTEM"],
    },
    //{
    //  name: "ຂໍ້ມູນຜູ້ໃຊ້ແອັບ BanHao",
    //  icon: <SettingsIcon fontSize="small" />,
    //  router: `${router.ALL_USER}`,
    //  access: ["SYSTEM"],
    //},
  ];
  const materialNavData = [
    {
      name: "ໜ້າຫຼັກ",
      icon: <EqualizerIcon fontSize="small" />,
      router: `${router.ADMIN_DASHBOARD}`,
      access: ["SYSTEM"],
    },
    {
      name: "ຈັດການຂໍ້ມູນໂຮງແຮມ",
      icon: <MapsHomeWorkIcon fontSize="small" />,
      router: `${router.ALL_HOTEL}`,
      access: ["SYSTEM"],
    },
    {
      name: "ແຜນທີ່ໂຮງແຮມ",
      icon: <MapIcon fontSize="small" />,
      router: `${router.MAP}`,
      access: ["SYSTEM"],
    },

    {
      name: "ໜ້າຫຼັກ",
      icon: <EqualizerIcon fontSize="small" />,
      router: `${router.DASHBOARD}`,
      access: ["OWNER", "STAFF", "ADMIN"],
    },
    {
      name: "ຈັດການຂໍ້ມູນພຶ້ນຖານ",
      icon: <MapsHomeWorkIcon fontSize="small" />,
      //router: `${router.EMPLOYEEMANAGEMENT}`,
      access: ["OWNER", "ADMIN"],
      sub: [
        {
          name: "ຈັດການຂໍ້ມູນປະເພດຫ້ອງ",
          icon: <BedroomParentIcon fontSize="small" />,
          router: `${router.ROOMTYPEMANAGEMENT}`,
          access: ["OWNER", "ADMIN"],
        },

        {
          name: "ຈັດການຂໍ້ມູນຫ້ອງ",
          icon: <KingBedIcon fontSize="small" />,
          router: `${router.ROOMMAGEMENT}`,
          access: ["OWNER", "ADMIN"],
        },
        {
          name: "ຈັດການຂໍ້ມູນພະນັກງານ",
          icon: <PeopleAltIcon fontSize="small" />,
          router: `${router.EMPLOYEEMANAGEMENT}`,
          access: ["OWNER", "ADMIN"],
        },
      ],
    },
    {
      name: "ບໍລິການ",
      icon: <PeopleOutlineSharpIcon fontSize="small" />,
      //router: `${router.HOTEL_BOOKING}`,
      access: ["OWNER", "STAFF", "ADMIN"],
      sub: [
        {
          name: "ຈອງຫ້ອງ",
          icon: <MenuBookIcon fontSize="small" />,
          router: `${router.HOTEL_BOOKING}`,
          access: ["OWNER", "STAFF", "ADMIN"],
        },

        {
          name: "ແຈ້ງເຂົ້າ",
          icon: <GradingIcon fontSize="small" />,
          router: `${router.CHECKIN}`,
          access: ["OWNER", "STAFF", "ADMIN"],
        },
        {
          name: "ລາຍການຈອງອອນໄລ",
          icon: <BookOnlineIcon fontSize="small" />,
          router: `${router.BOOKING}`,
          // Notification: notification,

          access: ["OWNER", "STAFF", "ADMIN"],
        },
      ],
    },

    //{
    //  name: "ລາຍງານ",
    //  icon: <SummarizeIcon fontSize="small" />,
    //  router: `${router.REPORT}`,
    //  access: ["OWNER", "STAFF", "ADMIN"],
    //},
    ///{
    ///  name: "ແກ້ໄຂການຂໍ້ມູນໂຮງແຮມ",
    ///  icon: <SettingsIcon fontSize="small" />,
    ///  router: `${router.SETTING}`,
    ///  access: ["OWNER"],
    ///},
 
    //{
    //  name: "ຂໍ້ມູນຜູ້ໃຊ້ແອັບ BanHao",
    //  icon: <SettingsIcon fontSize="small" />,
    //  router: `${router.ALL_USER}`,
    //  access: ["SYSTEM"],
    //},
  ];

  // react.useEffect(() => {
  //   socket.emit('hotel', hotelID)
  //   socket.on('test', data => console.log(data))
  //   socket.on('total', data => {
  //     //setNotification(data)
  //   })
  // }, [socket]);
  // const { notification, setNotification } = useContext(notificationContext);
  //const hotelID = localStorage.getItem("hotel");
  const fetchNotification = async () => {
    await socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("hotel", hotelID);
      socket.emit("private massage", hotelID);
      socket.on("test", (data) => console.log(data));
      socket.on(hotelID, (data) => {
        play();
        setNotification(data);
        console.log(notification);
      });
    });
  };

  react.useEffect(() => {
    fetchNotification();
  }, [socket]);

  return (
    <div>
      {/** this is side nav */}
      <div>
        <nav>
          <ul>
            {/** side nav header and logo name*/}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
                alignItems: "center",
                maxHeight: "40px",
              }}
            >
              {/**
               * <img src="../IMG.JPG" alt="img" height={50} />
               */}

              <h1
                style={{
                  color: "rgba(27, 21, 76, 1)",
                  fontFamily: `${font.LAO_FONT}`,
                }}
              >
                {hotelName}
              </h1>
            </div>
            <hr />
            {/**side nav menu */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "85%",
              }}
            >
              {/** user menu
               *  <div>
                {sideNavData?.map((data, index) => {
                  if (data.access.includes(userRole)) {
                    return (
                      <a
                        key={index}
                        onClick={() => {
                          if (!data.router == "") {
                            navigate(data?.router);
                          }
                        }}
                        style={{
                          backgroundColor:
                            location.pathname.split("/")[1] ===
                            data?.router.split("/")[1]
                              ? "#F8F9FA"
                              : `rgba(255, 255, 255, 1)`,
                        }}
                      >
                        <Stack direction="column">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            justifyContent="space-between"
                            sx={{
                              paddingRight: "30px",
                            }}
                          >
                            <Stack direction="row" spacing={1}>
                              <div>{data?.icon}</div>
                              <div>{data?.name}</div>
                            </Stack>
                            <div>
                              {data.Notification > 0 ? (
                                <Chip
                                  label={notification}
                                  color="error"
                                  size="small"
                                />
                              ) : null}
                            </div>
                          </Stack>
                        </Stack>
                      </a>
                    );
                  }
                })}
              </div>
               */}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
              >
                {materialNavData?.map((val, idx) => {
                  if (val.access.includes(userRole)) {
                    return (
                      <>
                        <ListItemButton
                          sx={{
                            backgroundColor:
                              location.pathname.split("/")[1] ===
                              val?.router?.split("/")[1]
                                ? "#F8F9FA"
                                : `rgba(255, 255, 255, 1)`,
                          }}
                          onClick={() => {
                            if (val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ") {
                              setOpen(!open);
                              setOpenService(false);
                            }
                            if (val.name == "ບໍລິການ") {
                              setOpenService(!openService);
                              setOpen(false);
                            }
                            if (val.router) {
                              navigate(val?.router);
                              setOpen(false);
                              setOpenService(false);
                            }
                          }}
                          key={idx}
                        >
                          <ListItemIcon>{val.icon}</ListItemIcon>
                          <ListItemText
                            
                            primary={<span style={{fontFamily: `${font.LAO_FONT}`}}>{val.name}</span>}
                          />
                          {val.sub ? (
                            val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" ? (
                              open ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            ) : val.name == "ບໍລິການ" ? (
                              openService ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            ) : null
                          ) : null}
                        </ListItemButton>
                        {val.name == "ບໍລິການ" ? (
                          <Collapse
                            in={openService}
                            timeout="auto"
                            unmountOnExit
                          >
                            {val?.sub?.map((data, index) => {
                              return (
                                <List component="div" disablePadding>
                                  <ListItemButton
                                    onClick={() => navigate(data.router)}
                                    sx={{
                                      pl: 4,
                                      backgroundColor:
                                        location.pathname.split("/")[1] ===
                                        data?.router?.split("/")[1]
                                          ? "#F8F9FA"
                                          : `rgba(255, 255, 255, 1)`,
                                    }}
                                  >
                                    <ListItemIcon>{data.icon}</ListItemIcon>
                                    <ListItemText primary={<span style={{fontFamily: `${font.LAO_FONT}`}}>{data.name}</span>} />
                                  </ListItemButton>
                                </List>
                              );
                            })}
                          </Collapse>
                        ) : val.name == "ຈັດການຂໍ້ມູນພຶ້ນຖານ" ? (
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            {val?.sub?.map((data, index) => {
                              return (
                                <List component="div" disablePadding>
                                  <ListItemButton
                                    onClick={() => navigate(data.router)}
                                    sx={{
                                      pl: 4,
                                      backgroundColor:
                                        location.pathname.split("/")[1] ===
                                        data?.router?.split("/")[1]
                                          ? "#F8F9FA"
                                          : `rgba(255, 255, 255, 1)`,
                                    }}
                                  >
                                    <ListItemIcon>{data.icon}</ListItemIcon>
                                    <ListItemText primary={<span style={{fontFamily: `${font.LAO_FONT}`}}>{data.name}</span>} />
                                  </ListItemButton>
                                </List>
                              );
                            })}
                          </Collapse>
                        ) : null}
                      </>
                    );
                  }
                })}
              </List>

              {/** log out menu */}
              <div>
                <a>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LogoutIcon fontSize="small" />
                    <div
                      onClick={() => {
                        localStorage.clear();
                        navigate(`/`);
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
      {/*** this is header layout */}
      <div style={{ marginLeft: "280px" }}>
        <Stack
          direction="row-reverse"
          alignItems="center"
          spacing={3}
          sx={{
            backgroundColor: "#F8F9FA",
            height: "60px",
            paddingRight: "30px",
          }}
        >
          <Stack direction="row-reverse" spacing={0} alignItems="center">
            {/**profile */}
            {localStorage.getItem("hotel") ? (
              <IconButton onClick={() => {}}>
                <Avatar
                  alt="Remy Sharp"
                  //src="/static/images/avatar/1.jpg"
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>
            ) : null}

            {/**name */}
            <span
              className="en"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              {localStorage.getItem("userName")}
            </span>
          </Stack>

          {/**notification */}
          {localStorage.getItem("hotel") ? (
            <IconButton
              onClick={() => {
                navigate(`${router.BOOKING}`);
              }}
            >
              <Badge color="error" badgeContent={notification}>
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
          ) : null}
        </Stack>
        <div style={{ margin: "30px 30px", padding: "", backgroundColor: "" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
