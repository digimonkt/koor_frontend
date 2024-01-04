import { Box } from "@mui/material";
import React from "react";
import styles from "./coverLetter.module.css";

const CreateCoverLetter = () => {
  return (
    <>
      <Box className={styles.createCoverLetter_box}>
        <h1 className={styles.heading}>Create a cover letter</h1>
      </Box>
    </>
  );
};

export default CreateCoverLetter;
