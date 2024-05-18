import { ErrorMessage } from "../../../components/caption";
import {
  CheckboxInput,
  LabeledInput,
  SelectInput,
} from "../../../components/input";
import {
  FormControl,
  FormGroup,
  Grid,
  Button,
  Input,
  InputAdornment,
  Stack,
} from "@mui/material";
import { JobFormControl } from "../../../pages/jobs/postJobs/style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
import { getJobSubCategories } from "../../../redux/slice/choices";

function TalentFilter({ formik, footer, responsive }) {
  const [isSubmmited, setSubmmited] = useState(false);
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
        getJobSubCategories({ categoryId: formik.values.jobCategories }),
      );
    }
  }, [formik.values.jobCategories]);

  return (
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
        setSubmmited(true);
      }}
    >
      <div className="SelectDropdown">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
                <SelectInput
                  multiple
                  title="SubCategory"
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
                  disabled={!formik.values.jobCategories}
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
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
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

          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <div>
              <FormControl sx={{ m: 1 }} className="filter_input">
                <SelectInput
                  title="City"
                  placeholder={
                    formik.values.country
                      ? "Choose city"
                      : "Select Country first"
                  }
                  disabled={!formik.values.country}
                  options={(cities.data[formik.values.country] || []).map(
                    (country) => ({
                      value: country.title,
                      label: country.title,
                    }),
                  )}
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <ErrorMessage>{formik.errors.city}</ErrorMessage>
                ) : null}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <label>Years of experience</label>
            <LabeledInput
              // title="Duration in Month"
              className="add-form-control mt-3"
              placeholder="Number of years of experience"
              {...formik.getFieldProps("experience")}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <label>Preferred job type</label>
            <FormGroup row sx={{ marginLeft: "7px" }} className="filter_input">
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
                label="Consultant"
                {...formik.getFieldProps("hasContract")}
                checked={formik.values.hasContract}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <label>Expected salary</label>

            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              sx={{ marginTop: "10px" }}
            >
              <Input
                placeholder="From"
                fullWidth
                {...formik.getFieldProps("salaryMin")}
                sx={{
                  "&.MuiInput-root": {
                    background: "#F0F0F0",
                    height: "44px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: "#000",
                    "&:after": { display: "none" },
                    "&:before": { display: "none" },
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Button
                      sx={{
                        padding: "10px",
                        minWidth: "auto",
                        borderRadius: "10px",
                        background: "#CACACA",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                        color: "rgb(18 18 18 / 50%)",
                        "&:hover": {
                          background: "#CACACA",
                        },
                      }}
                    >
                      USD
                    </Button>
                  </InputAdornment>
                }
              />
              <Input
                placeholder="To"
                {...formik.getFieldProps("salaryMax")}
                fullWidth
                sx={{
                  "&.MuiInput-root": {
                    background: "#F0F0F0",
                    height: "44px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: "#000",
                    padding: "0px 0px 0px 10px",
                    "&:after": { display: "none" },
                    "&:before": { display: "none" },
                  },
                }}
              />
            </Stack>

            {/* <div style={{ display: "flex", marginLeft: "7px" }}>
              <div>
                <HorizontalLabelInput
                  label="From"
                  placeholder="USD"
                  {...formik.getFieldProps("salaryMin")}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <HorizontalLabelInput
                  label="To"
                  placeholder="To"
                  {...formik.getFieldProps("salaryMax")}
                />
              </div>
            </div> */}
          </Grid>
          <Grid item xs={12} sm={6} lg={responsive ? 12 : 3}>
            <label>Availability</label>
            <FormGroup row sx={{ marginLeft: "7px" }} className="filter_input">
              <JobFormControl
                control={<CheckboxInput />}
                label="Available right now"
                {...formik.getFieldProps("available")}
                checked={formik.values.available}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </div>
      <div className={`${styles.historySearch}`}>
        {isSubmmited && (
          <h5>
            <b>{totalItems}</b> Talents found
          </h5>
        )}
        <div className={`${styles.savesearch}`}>{footer}</div>
      </div>
    </form>
  );
}

export default TalentFilter;
