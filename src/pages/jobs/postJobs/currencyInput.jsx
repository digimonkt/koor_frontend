import { Divider, FormControl, MenuItem, Stack } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SelectBoxStyle } from "../../../components/input";

function CurrencyInput({ title, currency, handleOptionChange, ...rest }) {
  return (
    <div>
      <label>{title}</label>
      <Stack direction="row" spacing={0} alignItems="center" className="usd-bg">
        <div className="usd">{currency}</div>
        <input className="usdinput" placeholder="0" {...rest} />
        <Divider orientation="vertical" variant="middle" flexItem />

        <FormControl
          sx={{
            "&.MuiSelect-select": {
              fontFamily: "Poppins",
              fontSize: "12px",
            },
          }}
          size="small"
          className="iconsize-select"
        >
          <SelectBoxStyle
            IconComponent={KeyboardArrowDownIcon}
            onChange={(e) => handleOptionChange && handleOptionChange(e)}
          >
            <MenuItem value="from">From</MenuItem>
            <MenuItem value="upTo">Up to</MenuItem>
          </SelectBoxStyle>
        </FormControl>
      </Stack>
    </div>
  );
}

export default CurrencyInput;
