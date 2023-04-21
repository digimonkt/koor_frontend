import React, { useState, useEffect } from "react";
import styles from "./advanceFilter.module.css";
import { MenuItem, MenuList } from "@mui/material";
import { OutlinedButton, SearchButton } from "@components/button";
import { SVG } from "@assets/svg";
import {
  deleteSearchJobsFilterAPI,
  getSearchJobsFilterAPI,
  saveSearchJobsFilterAPI,
} from "@api/job";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getJobCategories,
} from "@redux/slice/choices";
import { setAdvanceFilter } from "@redux/slice/search";
import JobSeekerFilter from "./jobSeekerFilter";
import { useFormik } from "formik";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SaveFilter from "./saveFilter";
import TalentFilter from "./talentFilter";
import { SEARCH_TYPE, USER_ROLES } from "@utils/enum";
function AdvanceFilter({ searchType }) {
  const dispatch = useDispatch();
  const {
    auth: { isLoggedIn, role },
    choices: { countries, jobCategories, cities },
  } = useSelector((state) => state);
  const [allFilters, setAllFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);

  const footer = () => {
    return (
      <>
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
      </>
    );
  };

  const searchFilter = () => {
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        return <JobSeekerFilter formik={formik} footer={footer()} />;
      case SEARCH_TYPE.talents:
        return <TalentFilter formik={formik} footer={footer()} />;
      default:
        return <></>;
    }
  };

  const handleToggleModel = () => {
    setOpen(!open);
  };

  const getSearchJobsFilter = async () => {
    const data = await getSearchJobsFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
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
    formik.setFieldValue("available", filter.isAvailable);
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
      isAvailable: filter.isAvailable,
    };
    if (!payload.timing) {
      delete payload.timing;
    }
    dispatch(setAdvanceFilter(payload));
  };
  const handleDeleteFilter = async (filterId) => {
    const newAllFilters = allFilters.filter((filter) => filter.id !== filterId);
    setAllFilters([...newAllFilters]);
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        await deleteSearchJobsFilterAPI(filterId);
        break;
      default:
        break;
    }
  };
  const handleReset = () => {
    formik.resetForm();
    setSelectedFilter("");
    dispatch(
      setAdvanceFilter({
        country: "",
        city: "",
        jobCategory: "",
        fullTime: false,
        partTime: false,
        contract: false,
        timing: "",
        isAvailable: false,
      })
    );
  };
  const handleSaveJobSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      job_category: rawData.jobCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
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
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }
  }, []);
  useEffect(() => {
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        getSearchJobsFilter();
        break;
      default:
        break;
    }
  }, [searchType]);

  const formik = useFormik({
    initialValues: {
      id: "",
      jobCategories: [],
      country: "",
      city: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,

      // talent
      available: false,
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
        isAvailable: values.available,
      };
      dispatch(setAdvanceFilter(payload));
    },
  });
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  return (
    <div>
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
                        <div
                        //   onClick={() => toggleNotificationStatus(filter.id)}
                        >
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
            style={{
              color: role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
              cursor: "pointer",
            }}
          >
            Advance filter{" "}
            {data ? (
              <>
                <span
                  style={{
                    marginLeft: "10px",
                    width: "18px",
                    display: "inline-block",
                    color:
                      role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
                  }}
                >
                  {<SVG.ArrowUpIcon />}
                </span>
              </>
            ) : (
              <span
                style={{
                  marginLeft: "10px",
                  width: "18px",
                  display: "inline-block",
                  color: role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
                }}
              >
                {<SVG.Downarrow />}
              </span>
            )}
          </div>
        </div>
        {data ? <>{searchFilter()}</> : null}
        <DialogBox open={open} handleClose={handleToggleModel}>
          <SaveFilter
            handleSaveSearch={(e, title) => {
              if (e) {
                e.preventDefault();
              }
              switch (searchType) {
                case SEARCH_TYPE.jobs:
                  handleSaveJobSearch(title);
                  break;
                default:
                  break;
              }
            }}
            handleCancel={handleToggleModel}
          />
        </DialogBox>
      </div>
    </div>
  );
}

export default AdvanceFilter;