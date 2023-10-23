import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";

export const JobFormControl = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.02em;
    color: #121212;
    marginleft: "0px";
  }

  @media screen and (max-width: 992px) {
    & .MuiFormControlLabel-label {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 480px) {
    & .MuiFormControlLabel-label {
      font-size: 12px;
    }
  }
`;
