import styled from "@emotion/styled";
import { FormControlLabel, Select } from "@mui/material";

export const FormLabelBox = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #121212;
  }
`;

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;
