/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @desc: If user is loggedIn and role is `role` then only be these component are visible
 */
function RoleRouteComponent(authRole) {
  return function ({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { role, isLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
      if (isLoggedIn) {
        if (!role) {
          navigate("/login", {
            state: {
              from: `${location.pathname}${location.search}`,
            },
          });
        } else if (role !== authRole) {
          navigate(`/${role}/my-profile`);
        }
      } else {
        navigate("/login", {
          state: {
            from: `${location.pathname}${location.search}`,
          },
        });
      }
    }, [navigate, role, isLoggedIn]);
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
