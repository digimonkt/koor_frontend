import AttachmentFile from "@components/attatchmentFile";
import { OutlinedButton } from "@components/button";
import { CheckboxInput, HorizontalLabelInput } from "@components/input";
import {
  Card,
  CardContent,
  // FormControl,
  FormGroup,
  Grid,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
const FormControlReminder = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    color: #121212;
  }
`;
function MyProfileComponent() {
  return (
    <>
      <Stack direction="row" spacing={3} className="mb-3" alignItems={"center"}>
        <h1 className="headding m-0">Add info to complete your profile</h1>
        <span className="later" style={{ color: "#274593" }}>
          Do it later
        </span>
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <div className="add-content">
                <h2 className="mb-4">About</h2>
                <form>
                  <HorizontalLabelInput label="Organization Name" />
                  <HorizontalLabelInput
                    label="Type of the organization"
                    type="select"
                    options={[]}
                  />

                  <HorizontalLabelInput label="Mobile Number (optional)" />
                  <HorizontalLabelInput label="License ID" />

                  <Stack
                    direction="row"
                    spacing={2}
                    className="dashedborder mb-3"
                    alignItems="center"
                  >
                    <AttachmentFile handleDrop={(e) => console.log(e)} />
                  </Stack>
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      value="wish"
                      control={<CheckboxInput />}
                      label=" I wish to receive notifications and other related information from Koor"
                    />
                  </FormGroup>
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      value="wish"
                      control={<CheckboxInput />}
                      label=" I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                    />
                  </FormGroup>
                  <div className="text-center mt-3">
                    <OutlinedButton variant="outlined" title="update info" />
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              {/* <UploadFile
                title="Your organization logo"
                textcolor="#274593"
                color="#274593"
                bgcolor="rgba(40, 71, 146, 0.1)"
              /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MyProfileComponent;
