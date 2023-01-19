import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const SelectStyled = styled(Select)(() => ({
  "& .MuiSelect-select": {
    background: "#F0F0F0",
    borderRadius: "10px",
    border: "0px",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "500",
    color: "#121212",
    padding: "10.5px 14px",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "10px",
  },
  "& fieldset": {
    display: "none",
  },
  "& .MuiSelect-icon": {
    fontSize: "20px",
    marginRight: "10px",
  },
}));
