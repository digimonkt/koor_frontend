import React, { useState } from "react";
import { SearchButton } from "../../components/button";
import MenuList from "@mui/material/MenuList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { SelectStyled } from "./style";
import { SVG } from "../../assets/svg";
import styles from "./styles.module.css";
import { MenuItem } from "@mui/material";

const CheckBox = ({ onChange, value }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Checkbox
      icon={<SVG.UncheckICon />}
      checkedIcon={<SVG.CheckBoxIcon />}
      checked={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
      {...label}
      sx={{
        color: "#CACACA",
        transition: "all 0.5s ease-out",
        padding: "0px",
        "&.Mui-checked": {
          color: "#FFA500",
          transition: "all 0.5s ease-out",
        },
      }}
    />
  );
};

const AdvanceFilter = () => {
  const [data, setData] = useState(false);

  return (
    <div className={`${styles.searchResult}`}>
      <div className="lables">
        <MenuList>
          <MenuItem>
            <span>Saved searches:</span>
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              lefticon={<SVG.Notificationactive />}
              text="Initial search"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              lefticon={<SVG.Notificationinactive />}
              text="France, $3K +"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              lefticon={<SVG.Notificationactive />}
              text="Whole Europe, Full-time $5+"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btninActive}`}
              lefticon={<SVG.Notificationactive />}
              text="Part-time, $2K+"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              lefticon={<SVG.Notificationinactive />}
              text="My city"
            />
          </MenuItem>
          <MenuItem className="ms-auto">
            <p onClick={() => setData(!data)}>
              Advanced filter{" "}
              {data ? (
                <>
                  <span>{<SVG.ArrowUpIcon />}</span>
                </>
              ) : (
                <span>{<SVG.Downarrow />}</span>
              )}
            </p>
          </MenuItem>
        </MenuList>
      </div>
      {data ? (
        <>
          <div className="SelectDropdown">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div>
                  <FormControl sx={{ m: 1, width: 330 }}>
                    <label className="space-bottom">Category</label>
                    <SelectStyled
                      id="demo-customized-select-native"
                      value="10"
                      onChange={() => {}}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      <MenuItem value={10}>Graphic Design; UI/UX</MenuItem>
                      <MenuItem value={20}>Graphic Design; UI/UX</MenuItem>
                    </SelectStyled>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <FormControl sx={{ m: 1, width: 330 }}>
                    <label className="space-bottom">Country</label>
                    <SelectStyled
                      id="demo-customized-select-native"
                      value="20"
                      onChange={() => {}}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      <MenuItem value={10}>Choose Country</MenuItem>
                      <MenuItem value={20}>Choose Country</MenuItem>
                      <MenuItem value={30}>Choose Country</MenuItem>
                    </SelectStyled>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <FormControl sx={{ m: 1, width: 330 }}>
                    <label className="space-bottom">City</label>
                    <SelectStyled
                      id="demo-customized-select-native"
                      value="30"
                      onChange={() => {}}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      <MenuItem value={10}>Choose city</MenuItem>
                      <MenuItem value={20}>Choose city</MenuItem>
                      <MenuItem value={30}>Choose city</MenuItem>
                    </SelectStyled>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="mt-2">
                  <label>Preffered job type</label>
                  <div className={`${styles.checkboxDiv}`}>
                    <div className="mt-2 ">
                      <CheckBox onChange={() => {}} />
                      <span className="ms-2">Part Time</span>
                    </div>
                    <div className="mt-2 ">
                      <CheckBox onChange={() => {}} />
                      <span className="ms-2">Full Time</span>
                    </div>
                    <div className="mt-2 ">
                      <CheckBox onChange={() => {}} />
                      <span className="ms-2">Contract</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <FormControl sx={{ m: 1, width: 330 }}>
                    <label className="space-bottom">Timing</label>
                    <SelectStyled
                      id="demo-customized-select-native"
                      value="30"
                      onChange={() => {}}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      <MenuItem value={10}>Choose city</MenuItem>
                      <MenuItem value={20}>Choose city</MenuItem>
                      <MenuItem value={30}>Choose city</MenuItem>
                    </SelectStyled>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.historySearch}`}>
            <h5>
              <b>456</b> jobs found
            </h5>
            <div className={`${styles.savesearch}`}>
              <span>{<SVG.Favorite />} SAVE SEARCH</span>
              <SearchButton
                lefticon={<SVG.SearchIcon style={{ color: "#EEA23D" }} />}
                text="search"
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AdvanceFilter;
