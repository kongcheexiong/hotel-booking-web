import { Navigate } from "react-router-dom";

import { router } from "../constants";

const ProtectedRoute = (props) => {
  //const { auth } = react.useContext(authContext);
  //const token = auth.accessToken;s
  const token = localStorage.getItem('accessToken')
  const { children } = props;

  if (!token) {
    return <Navigate to={`${router.LOGIN}`} replace />;
  }



  return children;
};

export default ProtectedRoute;
