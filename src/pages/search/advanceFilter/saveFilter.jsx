import { OutlinedButton } from "../../../components/button";
import { LabeledInput } from "../../../components/input";
import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";

function SaveFilter({ handleSaveSearch, handleCancel }) {
  const [name, setName] = useState("");

  return (
    <div>
      <h1 className="heading">Give it a name</h1>
      <div className="save_filter_popup_txt">
        Create a short and clear name for this saved search, so it won’t take
        too much space but is informative for you.
      </div>
      <div className="form-content">
        <form onSubmit={(e) => handleSaveSearch(e, name)}>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Name"
              type="text"
              style={{
                border: "1px solid #CACACA",
                borderRadius: "100px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
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
