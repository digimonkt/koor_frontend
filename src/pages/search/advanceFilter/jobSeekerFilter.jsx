import { ErrorMessage } from "@components/caption";
import { CheckboxInput, SelectInput } from "@components/input";
import { FormControl, FormGroup, Grid } from "@mui/material";
import { JobFormControl } from "@pages/jobs/postJobs/style";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
import { getJobSubCategories } from "@redux/slice/choices";

function JobSeekerFilter({ formik, footer }) {
  const dispatch = useDispatch();
  const {
    choices: { countries, cities, jobCategories, jobSubCategories },
    search: { totalItems },
  } = useSelector((state) => state);
  useEffect(() => {
    if (
      formik.values.jobCategories &&
      !jobSubCategories.data[formik.values.jobCategories]?.length
    ) {
      dispatch(
        getJobSubCategories({ categoryId: formik.values.jobCategories })
      );
    }
  }, [formik.values.jobCategories]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="SelectDropdown">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div>
              <FormControl
                sx={{ m: 1, marginLeft: 0, width: 330 }}
                className="filter_input"
              >
                <SelectInput
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
          <Grid item xs={3}>
            <div>
              <FormControl
                sx={{ m: 1, marginLeft: 0, width: 330 }}
                className="filter_input"
              >
                <SelectInput
                  multiple
                  title="SubCategory"
                  defaultValue=""
                  placeholder={
                    formik.values.jobCategories
                      ? "Job Sub Category"
                      : "Select Category first"
                  }
                  options={(
                    jobSubCategories.data[formik.values.jobCategories] || []
                  ).map((jobCategory) => ({
                    value: jobCategory.id,
                    label: jobCategory.title,
                  }))}
                  name={"jobSubCategories"}
                  value={formik.values.jobSubCategories}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.jobSubCategories &&
                formik.errors.jobSubCategories ? (
                  <ErrorMessage>{formik.errors.jobSubCategories}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
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
          <Grid item xs={3}>
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
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
            <label style={{ marginBottom: "25px" }}>Job type</label>
            <FormGroup row sx={{ marginLeft: "7px" }} className="filter_input">
              <JobFormControl
                control={<CheckboxInput sx={{ paddingLeft: "5px" }} />}
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
        <h5 style={{ margin: "0px" }}>
          <b>{totalItems}</b> jobs found
        </h5>
        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default JobSeekerFilter;
