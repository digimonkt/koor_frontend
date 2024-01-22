import { LabeledInput } from "@components/input";
import { OutlinedButton } from "../../../components/button";
import { Box, Grid, Stack } from "@mui/material";
import { USER_ROLES } from "@utils/enum";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function SaveFilter({ handleSaveSearch, handleCancel }) {
  const [name, setName] = useState("");

  const { role } = useSelector(({ auth }) => auth);

  const JOBSEEKERCOLOR = role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593";

  const handleInputChange = (e) => {
    // Limiting input to 40 characters
    const inputText = e.target.value.slice(0, 40);
    setName(inputText);
  };

  return (
    <div>
      <h1 className="heading">Give it a name</h1>
      <div className="save_filter_popup_txt">
        Create a short and clear name for this saved search, so it won’t take
        too much space but is informative for you.
      </div>
      <div className="form-content">
        <form onSubmit={(e) => handleSaveSearch(e, name)}>
          <LabeledInput
            placeholder="Name"
            type="text"
            style={{
              border: "1px solid #CACACA",
              borderRadius: "100px",
            }}
            value={name}
            onChange={handleInputChange}
          />
          <Box
            sx={{
              textAlign: "right",
              mt: 1,
              color: "#848484",
              fontSize: "16px",
            }}
          >
            {name.length}/40 characters
          </Box>
          <Grid item xl={12} lg={12} xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <OutlinedButton
                onClick={handleCancel}
                title="Cancel"
                sx={{
                  "&.MuiButtonBase-root": {
                    fontSize: "14px !important",
                    fontWeight: "600  !important",
                    border: "none !important",
                    background: "none !important",
                    color: "#848484 !important",
                    padding: "10px 0px !important",
                    fontFamily: "Poppins  !important",
                    "@media (max-width: 480px)": {
                      fontSize: "12px !important",
                    },
                  },
                }}
              />
              <OutlinedButton
                title={<>Save</>}
                sx={{
                  "&.MuiButtonBase-root": {
                    border: `1px solid ${JOBSEEKERCOLOR} !important`,
                    color: `${JOBSEEKERCOLOR} !important`,
                    width: "100px",
                    height: "42px",
                    "@media (max-width: 480px)": {
                      width: "95px",
                      height: "42px",
                    },
                    "&:hover": { background: "#eea23d14" },
                  },
                }}
                type="submit"
              />
            </Stack>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default SaveFilter;
