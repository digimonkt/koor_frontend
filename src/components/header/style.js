import { Stack, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SearchCategory = styled(Stack)(() => ({
  border: "1px solid #CACACA",
  background: "#fff",
  borderRadius: "50px",
  // height: "37px",
  width: "320px",
  "@media (min-width: 993px) and (max-width: 1024px)": {
    width: "280px",
  },
  // paddingLeft: "15px",
}));
export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #ffffff;
    border-radius: 0px;
    padding: 0px;
    border: 0px;
    color: #848484;
  }
  & .MuiSelect-select:focus {
    border-radius: 0px;
  }
  & .MuiSelect-icon {
    color: #848484;
  }
  ,
  &.MuiInputBase-root {
    border-radius: 0px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.02em;

    color: #848484;
  }
  & fieldset {
    display: none;
  }
`;
