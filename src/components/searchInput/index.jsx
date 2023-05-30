import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";
import { Container, IconButton } from "@mui/material";
import { SVG } from "@assets/svg";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";

export default function SearchInput({
  handleSearch,
  placeholder,
  svg,
  value,
  ...rest
}) {
  const { role } = useSelector((state) => state.auth);
  const [fieldValue, setFieldValue] = useState("");
  useEffect(() => {
    if (value) {
      setFieldValue(value);
    }
  }, [value]);
  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:600px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
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
              {...rest}
              onChange={(e) => setFieldValue(e.target.value)}
              value={fieldValue}
              onKeyDown={(e) => {
                if (e.key === "enter" || e.key === "Enter") {
                  handleSearch(fieldValue);
                }
              }}
            />
            <span
              onClick={() => handleSearch(fieldValue)}
              style={{
                background:
                  role === USER_ROLES.jobSeeker ? "#FEEFD3" : "#D5E3F7",
                borderRadius: "20px",
              }}
            >
              {svg}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
