import { setHideSideBar } from "@redux/slice/employer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "@assets/images";
import { Capacitor } from "@capacitor/core";
import InnerFooter from "@components/footer/innerfooter";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const platform = Capacitor.getPlatform();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHideSideBar(true));
    return () => {
      dispatch(setHideSideBar(false));
    };
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          margin: "5rem 0px",
        }}
      >
        <img src={IMAGES.NotFound} alt="" />

        <h1 style={{ marginTop: "4rem" }}>Oops...</h1>
        <p
          style={{ fontSize: "1.3rem", textAlign: "center", color: "#555555" }}
        >
          The page you're looking for doesn't exist. Check the URL <br></br>{" "}
          once again, or try to browse other pages on Koor.
        </p>
        <button
          style={{
            background: "#eea23d",
            color: "white",
            padding: "1rem",
            fontWeight: "600",
            borderRadius: "2rem",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => navigate("/")}
        >
          RETURN TO HOME
        </button>
      </div>
      {platform === "android" || platform === "ios"
        ? null
        : !isLoggedIn && <InnerFooter />}
    </>
  );
};

export default NotFoundPage;
