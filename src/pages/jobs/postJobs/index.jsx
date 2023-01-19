import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  LabeledInput,
  SelectInput,
} from "../../../components/input";
import CurrencyInput from "./currencyInput";
import { JobFormControl } from "../../jobSeeker/myProfile/job-preferences";
import { FilledButton, OutlinedButton } from "../../../components/button";

function PostJobsComponent() {
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
              Post a new job
              <span className="right-pull">
                <IconButton LinkComponent={Link} to={"/employer/manage-jobs"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <from>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8}>
                    <LabeledInput
                      title="Title of your job"
                      className="add-form-control"
                      placeholder="Online Research Participant (Work From Home/Part Time/Casual)…"
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
                  <Grid item xl={9} lg={9} xs={12}>
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
                  <Grid item xl={3} lg={3} xs={12}>
                    <label>Working place address</label>
                    <input
                      placeholder="Menara Suruhanjaya Syakinat St..."
                      className="add-form-control"
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Job Category (Maximum 2)</label>
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
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Job type</label>
                    <FormGroup row sx={{ marginLeft: "7px" }}>
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Part Time"
                      />
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Full Time"
                      />
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Contract"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Timing</label>
                    <input
                      type="text"
                      placeholder="5 Day week"
                      className="add-form-control"
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-3">Additional ways to apply</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply by email"
                    />
                    <input
                      className="add-form-control"
                      placeholder="contact@lotuss.us"
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply by call or SMS"
                    />
                    <input
                      className="add-form-control"
                      placeholder="Your mobile number"
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply via WhatsApp"
                    />
                    <input
                      className="add-form-control"
                      placeholder="Apply via WhatsApp"
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Preferences</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Education level</label>
                    <SelectInput
                      options={[
                        { value: "", title: "Choose an education level" },
                      ]}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>
                      Required languages
                      <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} sx={12}>
                        <SelectInput
                          options={[{ value: "", title: "English" }]}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          options={[{ value: "", title: "German" }]}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          options={[{ value: "", title: "Select language" }]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <label>
                    Job skills{" "}
                    <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                  </label>
                  <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        options={[
                          { value: "", title: "User interface design (UI/UX)" },
                        ]}
                      />
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        options={[{ value: "", title: "Select a skill" }]}
                      />
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        options={[{ value: "", title: "Select a skill" }]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
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
                    <FilledButton title="POST THE JOB" isBlueButton />
                  </Stack>
                </Grid>
              </from>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostJobsComponent;
