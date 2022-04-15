import {Navigate, useLocation  } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function PrivateRoute({ children}) {
  let location = useLocation();
  const auth = useAuth();
  return auth.user ? (children) : <Navigate to="/login" state={{ from: location }} />;
}


export default PrivateRoute;
