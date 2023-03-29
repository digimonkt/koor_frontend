import React from "react";
import styles from "./notification.module.css";

function ExpiredJobCard({ jobDetails }) {
  return (
    <div
      className={`${styles.content_div}`}
      //   style={{ background: item.color }}
    >
      <div>{/* <img src={item.img} alt="img" /> */}</div>
      <div className={styles.title_text_div}>
        <h2 className={styles.title}>
          A new job "{jobDetails.title}" was posted.
        </h2>
        {/* <p
          className={`${styles.text}`}
          //   style={{ background: jobDetails.background }}
        >
          It matches your "{filter.title}" Search
        </p> */}
        <p className={styles.duration}>{jobDetails.duration}</p>
      </div>
    </div>
  );
}

export default ExpiredJobCard;
