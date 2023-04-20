import { ErrorMessage } from "@components/caption";
import { CheckboxInput, SelectInput } from "@components/input";
import { FormControl, FormGroup, Grid } from "@mui/material";
import { JobFormControl } from "@pages/jobs/postJobs/style";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";

function JobSeekerFilter({ formik, footer }) {
  const {
    choices: { countries, cities, jobCategories },
    search: { totalItems },
  } = useSelector((state) => state);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="SelectDropdown">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }}>
                <SelectInput
                  multiple
                  title="Category"
                  defaultValue=""
                  placeholder="Select a Job category"
                  options={jobCategories.data.map((jobCategory) => ({
                    value: jobCategory.id,
                    label: jobCategory.title,
                  }))}
                  name={"jobCategories"}
                  value={formik.values.jobCategories}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.jobCategories && formik.errors.jobCategories ? (
                  <ErrorMessage>{formik.errors.jobCategories}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }}>
                <SelectInput
                  title="Country"
                  placeholder="Country"
                  defaultValue=""
                  options={countries.data.map((country) => ({
                    value: country.id,
                    label: country.title,
                  }))}
                  {...formik.getFieldProps("country")}
                />
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }}>
                <SelectInput
                  title="City"
                  placeholder={
                    formik.values.country ? "City" : "Select Country first"
                  }
                  disabled={!formik.values.country}
                  options={(cities.data[formik.values.country] || []).map(
                    (country) => ({
                      value: country.title,
                      label: country.title,
                    })
                  )}
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <ErrorMessage>{formik.errors.city}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <label>Job type</label>
            <FormGroup row sx={{ marginLeft: "7px" }}>
              <JobFormControl
                control={<CheckboxInput />}
                label="Part Time"
                {...formik.getFieldProps("isPartTime")}
                checked={formik.values.isPartTime}
              />
              <JobFormControl
                control={<CheckboxInput />}
                label="Full Time"
                {...formik.getFieldProps("isFullTime")}
                checked={formik.values.isFullTime}
              />
              <JobFormControl
                control={<CheckboxInput />}
                label="Contract"
                {...formik.getFieldProps("hasContract")}
                checked={formik.values.hasContract}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </div>
      <div className={`${styles.historySearch}`}>
        <h5>
          <b>{totalItems}</b> jobs found
        </h5>
        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default JobSeekerFilter;
