import { Card, CardContent, Grid, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { LabeledInput, SelectInput } from "../../../components/input";
import CurrencyInput from "./currencyInput";

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
                    
                  </Grid>
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
