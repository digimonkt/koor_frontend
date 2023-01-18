import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../redux/slice/user";

function LogoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoggedIn(false));
    navigate("/login");
  }, [dispatch, navigate]);
  return <div></div>;
}

export default LogoutForm;
