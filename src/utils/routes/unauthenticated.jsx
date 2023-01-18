import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../enum";

function UnauthenticatedRouteComponent({ children, redirectURL }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();
  if (isLoggedIn) {
    const path = role === USER_ROLES.jobSeeker ? "/my-profile" : "/dashboard";
    return (
      <Navigate
        to={location.state?.from || redirectURL || `../${role}${path}`}
      />
    );
  }
  return <div>{children}</div>;
}

UnauthenticatedRouteComponent.propTypes = {
  children: PropTypes.element.isRequired,
  redirectURL: PropTypes.string,
};

export default UnauthenticatedRouteComponent;
