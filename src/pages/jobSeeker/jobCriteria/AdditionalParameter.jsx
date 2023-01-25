import {
  Checkbox,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FormLabelBox, SelectBox } from ".";
import { SVG } from "@assets/svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { OutlinedButton } from "@components/button";

const AdditionalParameter = ({ handleChange, age, city, handleCity }) => {
  return (
    <div className="p-3">
      <Divider />
      <div className="py-3 additional-box">
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <label className="d-block mb-2">Country</label>
              <SelectBox
                value={age}
                onChange={(e) => handleChange(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                IconComponent={KeyboardArrowUpIcon}
              >
                <MenuItem value="" className="selectlabel">
                  Netherlands
                </MenuItem>
                <MenuItem value={10}>Others</MenuItem>
              </SelectBox>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <label className="d-block mb-2">City</label>
              <SelectBox
                value={city}
                onChange={(e) => handleCity(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                IconComponent={KeyboardArrowUpIcon}
              >
                <MenuItem value="">
                  <em
                    style={{
                      color: "#848484",
                      fontStyle: "normal",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    Choose city
                  </em>
                </MenuItem>
                <MenuItem value={10}>Scheveningen</MenuItem>
                <MenuItem value={11}>Katwijk</MenuItem>
                <MenuItem value={12}>Leiden</MenuItem>
                <MenuItem value={13}>Lisse</MenuItem>
                <MenuItem value={14}>Rijswijk</MenuItem>
              </SelectBox>
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <Divider className="my-3" />
            <label className="d-block" style={{ marginBottom: "0.5rem" }}>
              Job type
            </label>
            <FormGroup row>
              <FormLabelBox
                control={
                  <Checkbox
                    icon={<SVG.UncheckIcon />}
                    checkedIcon={<SVG.CheckBoxIcon />}
                    defaultChecked
                    sx={{
                      color: "#CACACA",
                      transition: "all 0.5s ease-out",
                      padding: "0px",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                        transition: "all 0.5s ease-out",
                      },
                    }}
                  />
                }
                label={<span className="ms-2 me-3 check-label">Part Time</span>}
              />
              <FormLabelBox
                icon={<SVG.UncheckIcon />}
                checkedIcon={<SVG.CheckBoxIcon />}
                disabled
                control={
                  <Checkbox
                    sx={{
                      color: "#CACACA",
                      transition: "all 0.5s ease-out",
                      padding: "0px",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                        transition: "all 0.5s ease-out",
                      },
                    }}
                  />
                }
                label={<span className="ms-2 me-3 check-label">Full Time</span>}
              />
              <FormLabelBox
                control={
                  <Checkbox
                    icon={<SVG.UncheckIcon />}
                    checkedIcon={<SVG.CheckBoxIcon />}
                    defaultChecked
                    sx={{
                      color: "#CACACA",
                      transition: "all 0.5s ease-out",
                      padding: "0px",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                        transition: "all 0.5s ease-out",
                      },
                    }}
                  />
                }
                label={<span className="ms-2 me-3 check-label">Contract</span>}
              />
            </FormGroup>
            <Divider className="my-3" />
          </Grid>
        </Grid>
      </div>
      <div className="text-center">
        <OutlinedButton
          title={
            <>
              <span className="me-2 d-inline-flex">
                <SVG.CheckIcon />
              </span>{" "}
              Done
            </>
          }
          component={Link}
          to="/job-seeker/my-profile/update-profile"
          sx={{
            "&.MuiButton-outlined": {
              border: "1px solid #EEA23D !important",
              color: "#EEA23D !important",
              fontWeight: "500",
              fontSize: "16px",
              padding: "10px 30px",

              "&:hover": {
                background: "rgba(255, 165, 0, 0.1)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalParameter;
