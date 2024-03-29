import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutUserAPI } from "../../api/user";
import { globalLocalStorage } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../redux/slice/user";

function LogoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await LogoutUserAPI();
    globalLocalStorage.cleanLocalStorage();
    navigate("/login");
  };
  useEffect(() => {
    dispatch(setIsLoggedIn(false));
    handleLogout();
  }, []);
  return <div></div>;
}

export default LogoutForm;
