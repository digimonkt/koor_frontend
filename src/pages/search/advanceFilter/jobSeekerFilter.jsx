import { ErrorMessage } from "../../../components/caption";
import { CheckboxInput, SelectInput } from "../../../components/input";
import { Box, FormControl, Grid } from "@mui/material";
import { JobFormControl } from "../../../pages/jobs/postJobs/style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./advanceFilter.module.css";
import { getJobSubCategories } from "../../../redux/slice/choices";
import { Capacitor } from "@capacitor/core";

function JobSeekerFilter({ formik, footer, responsive }) {
  const platform = Capacitor.getPlatform();
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
          <Grid
            item
            xs={platform === "android" || platform === "ios" ? 6 : 12}
            lg={responsive ? 12 : 3}
            sm={6}
          >
            <div>
              <FormControl
                sx={{ m: 1, marginLeft: 0, width: 330 }}
                className="filter_input"
              >
                <SelectInput
                  title="Category"
                  defaultValue=""
                  placeholder={
                    platform === "android" || platform === "ios"
                      ? "Select category"
                      : "Select a Job category"
                  }
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
          <Grid
            item
            xs={platform === "android" || platform === "ios" ? 6 : 12}
            lg={responsive ? 12 : 3}
            sm={6}
          >
            <div>
              <FormControl
                sx={{ m: 1, marginLeft: 0, width: 330 }}
                className="filter_input"
              >
                <SelectInput
                  multiple
                  title="SubCategory"
                  defaultValue=""
                  disabled={!formik.values.jobCategories}
                  placeholder={
                    platform === "android" || platform === "ios"
                      ? formik.values.jobCategories
                        ? "Job Sub Category"
                        : "Select Category"
                      : formik.values.jobCategories
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
          <Grid
            item
            xs={platform === "android" || platform === "ios" ? 6 : 12}
            lg={responsive ? 12 : 3}
            sm={6}
          >
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
          <Grid
            item
            xs={platform === "android" || platform === "ios" ? 6 : 12}
            lg={responsive ? 12 : 3}
            sm={6}
          >
            <div>
              <FormControl sx={{ m: 1, width: 330 }} className="filter_input">
                <SelectInput
                  title="City"
                  placeholder={
                    platform === "android" || platform === "ios"
                      ? formik.values.country
                        ? "City"
                        : "Select Country "
                      : formik.values.country
                        ? "City"
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
          <Grid item xs={12} lg={responsive ? 12 : 4} sm={12} md={4}>
            <label style={{ marginBottom: "25px" }}>Job type</label>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "center", lg: "flex-start" },
                flexDirection: { xs: "row", lg: "column" },
              }}
            >
              <JobFormControl
                sx={{
                  "&.MuiFormControlLabel-root .Mui-checked ~ .MuiTypography-root":
                    { fontWeight: 500 },
                  "&.MuiFormControlLabel-root": {
                    "@media (max-width:768px)": {
                      marginLeft: "-5px",
                      marginRight: "5px",
                    },
                  },
                }}
                control={
                  <CheckboxInput
                    sx={{
                      "@media (max-width:768px)": {
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      },
                    }}
                  />
                }
                label="Part Time"
                {...formik.getFieldProps("isPartTime")}
                checked={formik.values.isPartTime}
              />
              <JobFormControl
                sx={{
                  "&.MuiFormControlLabel-root .Mui-checked ~ .MuiTypography-root":
                    { fontWeight: 500 },
                  "&.MuiFormControlLabel-root": {
                    "@media (max-width:768px)": {
                      marginLeft: "-5px",
                      marginRight: "5px",
                    },
                  },
                }}
                control={
                  <CheckboxInput
                    sx={{
                      "@media (max-width:768px)": {
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      },
                    }}
                  />
                }
                label="Full Time"
                {...formik.getFieldProps("isFullTime")}
                checked={formik.values.isFullTime}
              />
              <JobFormControl
                sx={{
                  "&.MuiFormControlLabel-root .Mui-checked ~ .MuiTypography-root":
                    { fontWeight: 500 },
                  "&.MuiFormControlLabel-root": {
                    "@media (max-width:768px)": {
                      marginLeft: "-5px",
                      marginRight: "5px",
                    },
                  },
                }}
                control={
                  <CheckboxInput
                    sx={{
                      "@media (max-width:768px)": {
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      },
                    }}
                  />
                }
                label="Contract"
                {...formik.getFieldProps("hasContract")}
                checked={formik.values.hasContract}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
      <div className={`${styles.historySearch}`}>
        {isSubmmited && (
          <h5 style={{ margin: "20px" }}>
            <b>{totalItems}</b> jobs found
          </h5>
        )}
        <div
          style={{
            marginTop: "0px",
            width: platform === "android" || platform === "ios" ? "100%" : null,
            flexDirection:
              platform === "android" || platform === "ios" ? "row" : null,
            flexWrap:
              platform === "android" || platform === "ios" ? "wrap" : null,
            justifyContent:
              platform === "android" || platform === "ios" ? "center" : null,
          }}
          className={`${styles.savesearch}`}
        >
          {footer}
        </div>
      </div>
    </form>
  );
}

export default JobSeekerFilter;
