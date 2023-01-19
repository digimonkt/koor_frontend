import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";
import { Container, IconButton } from "@mui/material";
import { SVG } from "../../assets/svg";

export default function Searchinput({ placeholder, svg }) {
  return (
    <div>
      <Container>
        <div className={`${styles.searchInput}`}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="searchmainbox">
            <small className="telentsearchicon">{<SVG.HeaderSearch />}</small>
            <input
              className={`${styles.searchbox}`}
              placeholder={placeholder}
            />
            <span>{svg}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
