import { ANIMATIONS } from "@assets/animation";
import React from "react";
import Lottie from "react-lottie";
import styles from "./animations.module.css";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";
function ComingSoonComponent({ title }) {
  const { role } = useSelector((state) => state.auth);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ANIMATIONS.COMING_SOON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    colorFilters: [
      {
        keypath: "bg Outlines",
        color: "#000000",
      },
    ],
  };
  return (
    <div
      className={styles["no-data-found"]}
      style={{ color: role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593" }}
    >
      <Lottie
        options={defaultOptions}
        height={200}
        width={500}
        isStopped={false}
        isPaused={false}
      />
      <p>{title}</p>
    </div>
  );
}

export default ComingSoonComponent;
