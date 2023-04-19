import { ANIMATIONS } from "@assets/animation";
import React from "react";
import Lottie from "react-lottie";
import styles from "./animations.module.css";
function NoRecordFoundComponent({ title }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ANIMATIONS.NO_RECORD_FOUND,
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
    <div className={styles["no-data-found"]} style={{ color: "#848484" }}>
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
        isStopped={false}
        isPaused={false}
      />
      <div>{title}</div>
    </div>
  );
}

export default NoRecordFoundComponent;
