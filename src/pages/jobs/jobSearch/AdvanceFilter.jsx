import React, { useEffect, useState } from "react";
import { SearchButton, OutlinedButton } from "@components/button";
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
import { CheckboxInput, SelectInput } from "@components/input";
import { ErrorMessage } from "@components/caption";
import { JobFormControl } from "../postJobs/style";
import DialogBox from "@components/dialogBox";
import {
  deleteSearchJobsFilterAPI,
  getSearchJobsFilterAPI,
  saveSearchJobsFilterAPI,
  updateSavedSearchFilterAPI,
} from "@api/job";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SaveFilter from "./saveFilter";
import { useSearchParams } from "react-router-dom";

const AdvanceFilter = ({ getSearchJobs, totalJobs, searchKeyword }) => {
  const [searchParams] = useSearchParams({});
  const dispatch = useDispatch();
  const { countries, cities, jobCategories } = useSelector(
    (state) => state.choices
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [submitForm, setSubmitForm] = useState(false);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [allFilters, setAllFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const getSearchJobsFilter = async () => {
    const data = await getSearchJobsFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
    }
  };

  const handleToggleModel = () => {
    setOpen(!open);
  };

  const handleSaveSearch = (title) => async (e) => {
    if (e) {
      e.preventDefault();
    }
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      job_category: rawData.jobCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
      working_days: rawData.workingDays,
    };
    if (rawData.country) {
      const city = cities.data[rawData.country].find(
        (city) => city.title === rawData.city
      );
      data.city = city?.id;
    }
    const res = await saveSearchJobsFilterAPI(data);
    if (res.remote === "success") {
      setAllFilters((prevState) => [res.data, ...prevState]);
      setSelectedFilter(res.data.id);
      dispatch(setSuccessToast("Filter Saved Successfully"));
      handleToggleModel();
    } else {
      // temporarily showing error message
      dispatch(setErrorToast("Name is required"));
    }
  };

  const handleSelectFilter = async (filter) => {
    setSelectedFilter(filter.id);
    formik.setFieldValue("id", filter.id);
    formik.setFieldValue("jobCategories", filter.jobCategories);
    formik.setFieldValue("country", filter.country?.id || "");
    formik.setFieldValue("city", filter.city?.title || "");
    formik.setFieldValue("isFullTime", filter.isFullTime);
    formik.setFieldValue("isPartTime", filter.isPartTime);
    formik.setFieldValue("hasContract", filter.isPartTime);
    formik.setFieldValue("workingDays", filter.workingDays);
    const payload = {
      country: filter.country?.title || "",
      city: filter.city?.title || "",
      jobCategory: filter.jobCategories.map((jobCategory) => {
        return jobCategories.data.find(
          (category) => category.id === jobCategory
        );
      }),
      fullTime: filter.isFullTime,
      partTime: filter.isPartTime,
      contract: filter.hasContract,
      timing: filter.workingDays,
    };
    if (!payload.timing) {
      delete payload.timing;
    }
    await handleSearchJobs(payload);
  };
  const handleSearchJobs = async (payload) => {
    if (searchKeyword) {
      payload.search = searchKeyword;
    }
    await getSearchJobs(payload);
  };
  const handleReset = () => {
    formik.resetForm();
    setSelectedFilter("");
    getSearchJobs({});
  };

  const handleDeleteFilter = async (filterId) => {
    const newAllFilters = allFilters.filter((filter) => filter.id !== filterId);
    setAllFilters([...newAllFilters]);
    await deleteSearchJobsFilterAPI(filterId);
  };
  const toggleNotificationStatus = async (filterId) => {
    let newFilters = [...allFilters];
    const filter = newFilters.find((filter) => filter.id === filterId);
    if (filter) {
      const currentStatus = filter.isNotification;
      newFilters = newFilters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            isNotification: !filter.isNotification,
          };
        }
        return filter;
      });
      setAllFilters([...newFilters]);
      const res = await updateSavedSearchFilterAPI(filterId, !currentStatus);
      console.log({ res });
    }
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      jobCategories: [],
      country: "",
      city: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      workingDays: 5,
    },

    onSubmit: async (values) => {
      const country = countries.data.find(
        (country) => country.id === values.country
      );
      const payload = {
        country: country ? country.title : "",
        city: values.city,
        jobCategory: values.jobCategories.map((jobCategory) => {
          return jobCategories.data.find(
            (category) => category.id === jobCategory
          );
        }),
        fullTime: values.isFullTime,
        partTime: values.isPartTime,
        contract: values.hasContract,
        timing: values.workingDays,
      };

      await handleSearchJobs(payload);
    },
  });

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }
    getSearchJobsFilter();
  }, []);
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  useEffect(() => {
    const categories = searchParams.get("categories");
    const location = searchParams.get("location");
    if (location) {
      formik.setFieldValue("country", location);
    }
    if (categories) {
      formik.setFieldValue("jobCategories", [categories]);
    }
    if (location || categories) {
      setSubmitForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (submitForm) {
      setTimeout(() => formik.submitForm(), 500);
    }
  }, [submitForm]);

  return (
    <div className={`${styles.searchResult}`}>
      <div className={`${styles.label} lables`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            maxWidth: "90%",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>Saved searches:</span>
          <MenuList
            style={{
              overflow: "auto",
              marginLeft: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {allFilters.map((filter) => {
              return (
                <MenuItem key={filter.id}>
                  <SearchButton
                    className={`${
                      selectedFilter === filter.id
                        ? styles.btninActive
                        : styles.btnActive
                    }`}
                    leftIcon={
                      <div onClick={() => toggleNotificationStatus(filter.id)}>
                        {filter.isNotification ? (
                          <SVG.Notificationactive />
                        ) : (
                          <SVG.Notificationinactive />
                        )}
                      </div>
                    }
                    text={
                      <div onClick={() => handleSelectFilter(filter)}>
                        {filter.title}
                      </div>
                    }
                    handleCross={() => {
                      handleDeleteFilter(filter.id);
                    }}
                  />
                </MenuItem>
              );
            })}
          </MenuList>
        </div>
        <div
          onClick={() => setData(!data)}
          style={{ color: "#FFA500", cursor: "pointer" }}
        >
          Advanced filter{" "}
          {data ? (
            <>
              <span style={{ marginLeft: "10px" }}>{<SVG.ArrowUpIcon />}</span>
            </>
          ) : (
            <span style={{ marginLeft: "10px" }}>{<SVG.Downarrow />}</span>
          )}
        </div>
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
                <span style={{ pointer: "cursor" }} onClick={handleReset}>
                  {<SVG.HalfCircle />} RESET FILTER
                </span>
                {isLoggedIn ? (
                  <span
                    style={{ pointer: "cursor" }}
                    onClick={() => {
                      handleToggleModel();
                    }}
                  >
                    {<SVG.Favorite />} SAVE SEARCH
                  </span>
                ) : (
                  ""
                )}
                <OutlinedButton
                  title={
                    <>
                      <span>
                        <SVG.SearchIcon style={{ color: "#EEA23D" }} />
                      </span>
                      {formik.isSubmitting ? "Searching..." : "Search"}
                    </>
                  }
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>
          </form>
        </>
      ) : null}
      <DialogBox open={open} handleClose={handleToggleModel}>
        <SaveFilter
          handleSaveSearch={handleSaveSearch}
          handleCancel={handleToggleModel}
        />
      </DialogBox>
    </div>
  );
};

export default AdvanceFilter;
