import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  AttachmentDragNDropInput,
  LabeledInput,
  SelectInput,
} from "@components/input";
import CurrencyInput from "@pages/jobs/postJobs/currencyInput";
import { FilledButton, OutlinedButton } from "@components/button";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";

const PostTender = () => {
  // navigate
  const navigate = useNavigate();

  return (
    <div className="job-application">
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}
        >
          <div className="job-content">
            <h2>
              Post a new tender
              <span className="right-pull">
                <IconButton onClick={() => navigate(-1)}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <from>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8}>
                    <LabeledInput
                      title="Title of your tender"
                      className="add-form-control"
                      placeholder="Bed And Breakfast Temporary Accommodation"
                    />
                  </Grid>
                  <Grid item xl={4} lg={4}>
                    <CurrencyInput
                      currency="USD"
                      title="Budget"
                      handleOptionChange={(e) => console.log(e.target.value)}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <div>
                      <label>Description</label>
                      <textarea
                        className="form-control-area"
                        placeholder="Write more details to attract the right candidates."
                      ></textarea>
                    </div>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Location</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} sx={12}>
                        <SelectInput
                          placeholder="Country"
                          value="1"
                          options={[{ value: "1", label: "India" }]}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          placeholder="Country"
                          value="1"
                          options={[{ value: "1", label: "Gwalior" }]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Category (Maximum 2)</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          options={[{ value: "react", label: "ReactJS" }]}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} sx={12}>
                        <SelectInput
                          options={[{ value: "react", label: "ReactJS" }]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Sector</label>
                        <SelectInput
                          options={[
                            {
                              value: "",
                              title: "User interface design (UI/UX)",
                            },
                          ]}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Type</label>
                        <SelectInput
                          options={[{ value: "", title: "Select a skill" }]}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Tag</label>
                        <SelectInput
                          options={[{ value: "", title: "Select a skill" }]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                </Grid>

                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-2 mb-3">Attach files</h2>
                  <AttachmentDragNDropInput
                    files={[]}
                    handleDrop={() => console.log("running....")}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider
                    sx={{ borderColor: "#CACACA", opacity: "1", my: 2 }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <OutlinedButton
                      title="Cancel"
                      sx={{
                        "&.MuiButton-outlined": {
                          borderRadius: "73px",
                          border: "0px",
                          color: "#848484",
                          fontWeight: "500",
                          fontSize: "16px",
                          fontFamily: "Bahnschrift",
                          padding: "6px 50px",

                          "&:hover": {
                            background: "rgba(40, 71, 146, 0.1)",
                            color: "#274593",
                          },
                          "@media (max-width: 992px)": {
                            padding: "5px 15px",
                            fontSize: "14px",
                          },
                        },
                      }}
                    />
                    <FilledButton title="POST THE TENDER" isBlueButton />
                  </Stack>
                </Grid>
              </from>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostTender;
