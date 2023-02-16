import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUserAPI } from "@api/user";
import { globalLocalStorage } from "@utils/localStorage";

function LogoutForm() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await LogoutUserAPI();
  };
  useEffect(() => {
    globalLocalStorage.removeAccessToken();
    globalLocalStorage.removeRefreshToken();
    handleLogout();
    navigate("/login");
  }, []);
  return <div></div>;
}

export default LogoutForm;
