import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "@redux/slice/user";
import { LogoutUserAPI } from "@api/user";

function LogoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await LogoutUserAPI();
  };
  useEffect(() => {
    handleLogout();
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  }, [dispatch, navigate]);
  return <div></div>;
}

export default LogoutForm;
