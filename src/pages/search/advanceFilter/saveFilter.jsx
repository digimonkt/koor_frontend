import { OutlinedButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";

function SaveFilter({ handleSaveSearch, handleCancel }) {
  const [name, setName] = useState("");

  return (
    <div>
      <h1 className="heading">Give it a name</h1>
      <div
        style={{
          fontWeight: "400",
          fontSize: "16px",
          color: "black",
          lineHeight: "18px",
          letterSpacing: "0.01em",
        }}
      >
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
                    border: "none !important",
                    background: "none !important",
                    color: "#848484 !important",
                  },
                }}
              />
              <OutlinedButton
                title={<>Save</>}
                sx={{
                  "&.MuiButtonBase-root": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
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
