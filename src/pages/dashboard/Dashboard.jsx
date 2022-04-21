import React from "react";
import { useNavigate } from "react-router-dom";

// auth
import Auth from "../../auth.js";
import { router } from "../../constants/index.js";
import SideNav from "../../components/sideNav/sideNav.jsx";
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      
      <button
        onClick={() => {
          Auth.logOut(() => {
            navigate(`/login`, { replace: true });
          });
        }}
      >
        logout
      </button>
    </div>
  );
}

export default Dashboard;
