import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function UnauthenticatedRouteComponent({ children, redirectURL }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();
  if (isLoggedIn) {
    return (
      <Navigate
        to={location.state?.from || redirectURL || `../${role}/my-profile`}
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
