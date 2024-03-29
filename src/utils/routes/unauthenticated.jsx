import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../enum";

function UnauthenticatedRouteComponent({ children, redirectURL }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, isLoggedIn, currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    const path = role === USER_ROLES.jobSeeker ? "/my-profile" : "/dashboard";
    const fromPath = location.state?.from.includes(role)
      ? location.state?.from
      : null;
    const defaultPath =
      !currentUser?.profile?.isVerified && role !== USER_ROLES.employer
        ? "/account-verification"
        : `../${role}${path}`;
    if (role && isLoggedIn) {
      navigate(fromPath || redirectURL || defaultPath);
    }
  }, [role, isLoggedIn, window.location.pathname]);

  return <div>{children}</div>;
}

UnauthenticatedRouteComponent.propTypes = {
  children: PropTypes.element.isRequired,
  redirectURL: PropTypes.string,
};

export default UnauthenticatedRouteComponent;
