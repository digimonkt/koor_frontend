import { OutlinedButton } from "../../../components/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
function CancelApply({ handleClose }) {
  const navigate = useNavigate();
  return (
    <div className={styles.cancel_card}>
      <h1>Cancel applying?</h1>
      <p>
        Are you sure you want to go back and delete all the info you’ve added?{" "}
      </p>
      <div className={`${styles.cancel_popup}`}>
        <OutlinedButton
          className={styles.CancelApply_button}
          title="Yes, cancel"
          jobSeeker
          onClick={() => navigate(-1)}
        />
        <p onClick={handleClose}>Back to applying</p>
      </div>
    </div>
  );
}

export default CancelApply;
