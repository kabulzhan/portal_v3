import {  Navigate,  useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// string
function GuestRoute({ children, ...rest }) {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default GuestRoute;
