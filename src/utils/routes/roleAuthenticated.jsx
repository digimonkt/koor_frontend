/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * @desc: If user is loggedIn and role is `role` then only be these component are visible
 */
function RoleRouteComponent(authRole) {
  return function ({ children }) {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);
    useEffect(() => {
      if (role !== authRole) {
        navigate(`/${role}/my-profile`);
      }
    }, [navigate, role]);
    return <>{children}</>;
  };
}

export default RoleRouteComponent;

/**
 * useEffect(() => {
      if (role !== authRole) {
        return <Navigate to={`/${role}/my-profile`} />;
      }
    }, [role]);
 */
