import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &.MuiInputBase-root {
    border-radius: 0px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    letter-spacing: 0.02em;
    opacity: 0.5;
    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;
