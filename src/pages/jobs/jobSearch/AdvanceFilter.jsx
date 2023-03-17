import React, { useEffect, useState } from "react";
import { SearchButton } from "@components/button";
import MenuList from "@mui/material/MenuList";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { SVG } from "@assets/svg";
import styles from "./styles.module.css";
import { FormGroup, MenuItem, Slider } from "@mui/material";
import { useFormik } from "formik";
import {
  getCities,
  getCountries,
  getJobCategories,
} from "@redux/slice/choices";
import { useDispatch, useSelector } from "react-redux";
import { CheckboxInput, LabeledInput, SelectInput } from "@components/input";
import { ErrorMessage } from "@components/caption";
import { JobFormControl } from "../postJobs/style";
import DialogBox from "@components/dialogBox";
import { saveSearchJobsAPI } from "@api/job";

const AdvanceFilter = ({ getSearchJobs, totalJobs, searchKeyword }) => {
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  // const [searchData, setSearchData] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      jobCategories: [],
      country: "",
      city: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
    },

    onSubmit: async (values) => {
      const country = countries.data.find(
        (country) => country.id === values.country
      );
      const payload = {
        country: country ? country.title : "",
        city: values.city,
        jobCategory: values.jobCategories,
        fullTime: values.isFullTime,
        partTime: values.isPartTime,
        contract: values.hasContract,
        timing: values.workingDays,
      };
      getSearchJobs(payload);
    },
  });

  const { countries, cities, jobCategories } = useSelector(
    (state) => state.choices
  );
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }
  }, []);
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  const handleToggleModel = () => {
    setOpen(!open);
  };
  const handleSaveSearch = () => {
    const rawData = formik.values;
    const city = cities.data[rawData.country].find(
      (city) => city.title === rawData.city
    );

    const data = {
      title: rawData.name,
      country: rawData.country,
      city: city ? city.id : "",
      job_category: rawData.jobCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
      working_days: rawData.workingDays,
    };
    console.log(data);
    saveSearchJobsAPI(data);
  };
  return (
    <div className={`${styles.searchResult}`}>
      <div className="lables">
        <MenuList>
          <MenuItem>
            <span>Saved searches:</span>
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              leftIcon={<SVG.Notificationactive />}
              text="Initial search"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              leftIcon={<SVG.Notificationinactive />}
              text="France, $3K +"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              leftIcon={<SVG.Notificationactive />}
              text="Whole Europe, Full-time $5+"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btninActive}`}
              leftIcon={<SVG.Notificationactive />}
              text="Part-time, $2K+"
            />
          </MenuItem>
          <MenuItem>
            <SearchButton
              className={`${styles.btnActive}`}
              leftIcon={<SVG.Notificationinactive />}
              text="My city"
            />
          </MenuItem>
          <MenuItem className="ms-auto">
            <p onClick={() => setData(!data)}>
              Advanced filter{" "}
              {data ? (
                <>
                  <span style={{ marginLeft: "10px" }}>
                    {<SVG.ArrowUpIcon />}
                  </span>
                </>
              ) : (
                <span style={{ marginLeft: "10px" }}>{<SVG.Downarrow />}</span>
              )}
            </p>
          </MenuItem>
        </MenuList>
      </div>
      {data ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className="SelectDropdown">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div>
                    <FormControl sx={{ m: 1, width: 330 }}>
                      <SelectInput
                        title="Category"
                        defaultValue=""
                        placeholder="Select a Job category"
                        options={jobCategories.data.map((jobCategory) => ({
                          value: jobCategory.id,
                          label: jobCategory.title,
                        }))}
                        name={"jobCategories[0]"}
                        value={formik.values.jobCategories[0] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.jobCategories &&
                      formik.errors.jobCategories ? (
                        <ErrorMessage>
                          {formik.errors.jobCategories}
                        </ErrorMessage>
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
                          formik.values.country
                            ? "City"
                            : "Select Country first"
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
                <Grid item xs={4}>
                  <div>
                    <FormControl sx={{ m: 1, width: 330 }}>
                      <label>
                        Timing ({formik.values.workingDays} Day week)
                      </label>
                      <Slider
                        defaultValue={5}
                        step={1}
                        marks
                        min={1}
                        max={7}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value} Day week`}
                        {...formik.getFieldProps("workingDays")}
                        value={formik.getFieldProps("workingDays").value || 5}
                      />
                      {formik.touched.timing && formik.errors.timing ? (
                        <ErrorMessage>{formik.errors.timing}</ErrorMessage>
                      ) : null}
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={`${styles.historySearch}`}>
              <h5>
                <b>{totalJobs}</b> jobs found
              </h5>
              <div className={`${styles.savesearch}`}>
                <span style={{ pointer: "cursor" }} onClick={formik.resetForm}>
                  {<SVG.HalfCircle />} RESET
                </span>
                <span
                  style={{ pointer: "cursor" }}
                  onClick={() => {
                    handleToggleModel();
                  }}
                >
                  {<SVG.Favorite />} SAVE SEARCH
                </span>
                <SearchButton
                  leftIcon={<SVG.SearchIcon style={{ color: "#EEA23D" }} />}
                  text="search"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </>
      ) : null}
      <DialogBox open={open} handleClose={handleToggleModel}>
        <LabeledInput
          placeholder="name"
          title="Name"
          subtitle=""
          type="text"
          onChange={(e) => {
            // console.log({ hello: e.target.value });
            formik.setFieldValue("name", e.target.value);
          }}
        />
        <span
          style={{ pointer: "cursor" }}
          onClick={() => {
            handleSaveSearch();
          }}
        >
          SAVE
        </span>
      </DialogBox>
    </div>
  );
};

export default AdvanceFilter;
