import React from "react";

import styles from "./inputsearch.module.css";

import { SVG } from "@assets/svg";

const InputSearch = ({ placeholder, svg, ...rest }) => {
  return (
    <>
      <div className={`${styles.searchInput}`}>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton> */}
        <div className="searchmainbox">
          <small className="telentsearchicon">{<SVG.HeaderSearch />}</small>
          <input
            className={`${styles.searchbox}`}
            placeholder={"Search"}
            {...rest}
          />
          <span>{svg}</span>
        </div>
      </div>
    </>
  );
};

export default InputSearch;
