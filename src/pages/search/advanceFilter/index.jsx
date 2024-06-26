import React, { useState, useEffect } from "react";
import styles from "./advanceFilter.module.css";
import { Box, MenuItem, Stack } from "@mui/material";
import { OutlinedButton, SearchButton } from "../../../components/button";
import { SVG } from "../../../assets/svg";
import {
  deleteSearchJobsFilterAPI,
  getSearchJobsFilterAPI,
  saveSearchJobsFilterAPI,
  updateSavedSearchFilterAPI,
} from "../../../api/job";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getJobCategories,
  getTenderOpportunityType,
  getTenderTags,
  getTenderCategories,
  getTenderSector,
  getJobSubCategories,
} from "../../../redux/slice/choices";
import { setAdvanceFilter, setSearching } from "../../../redux/slice/search";
import JobSeekerFilter from "./jobSeekerFilter";
import { useFormik } from "formik";
import DialogBox from "../../../components/dialogBox";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
import SaveFilter from "./saveFilter";
import TalentFilter from "./talentFilter";
import { SEARCH_TYPE, USER_ROLES } from "../../../utils/enum";
import { DATABASE_DATE_FORMAT } from "../../../utils/constants/constants";
import {
  deleteSearchUserFilterAPI,
  getSearchUserFilterAPI,
  saveSearchUserFilterAPI,
  updateSavedSearchUserFilterAPI,
} from "../../../api/user";
import TenderFilter from "./tenderFilter";
import dayjs from "dayjs";
import {
  deleteSearchTenderFilterAPI,
  deleteSearchVendorFilterAPI,
  getSearchTenderFilterAPI,
  getSearchVendorFilterAPI,
  saveSearchTenderFilterAPI,
  saveSearchVendorFilterAPI,
  updateSavedSearchTenderFilterAPI,
  updateSavedSearchVendorFilterAPI,
} from "../../../api/vendor";
import VendorFilter from "./vendorFilter";
import { useSearchParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ShowText, getObject } from "./components";
function AdvanceFilter({ searchType, defaultOpen, responsive }) {
  const matches = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const { isMobileView } = useSelector(({ platform }) => platform);
  const [searchParams] = useSearchParams();
  const {
    auth: { role, isLoggedIn },
    choices: {
      countries,
      jobCategories,
      cities,
      jobSubCategories,
      opportunityTypes,
      tags,
      tenderCategories,
      sectors,
    },
  } = useSelector((state) => state);
  let category = [];
  switch (searchType) {
    case SEARCH_TYPE.jobs:
      category = jobCategories;
      break;
    case SEARCH_TYPE.talents:
      category = jobCategories;
      break;
    case SEARCH_TYPE.tenders:
      category = tenderCategories;
      break;
    case SEARCH_TYPE.vendors:
      category = tenderCategories;
      break;
    default:
      // eslint-disable-next-line no-unused-vars
      category = jobCategories;
  }
  const [allFilters, setAllFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterId, setFilterId] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const JOBSEEKERCOLOR = role === USER_ROLES.jobSeeker ? "#feefd3" : "#D5E3F7";

  useEffect(() => {
    setData(!!defaultOpen);
  }, []);

  const footer = () => {
    return (
      <>
        <span style={{ pointer: "cursor" }} onClick={handleReset}>
          {<SVG.HalfCircle />} RESET FILTER
        </span>
        {isLoggedIn && (
          <span
            style={{ pointer: "cursor", marginTop: "5px" }}
            onClick={() => {
              handleToggleModel();
            }}
          >
            {<SVG.Favorite />} SAVE SEARCH
          </span>
        )}
        <OutlinedButton
          style={{
            pointer: "cursor",
            marginTop: "5px",
            color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
            border:
              role === USER_ROLES.jobSeeker
                ? "1px solid #eea23d"
                : "1px solid #274593",
          }}
          title={
            <>
              <span>
                <SVG.SearchIcon
                  style={{
                    marginRight: "5px",
                    color:
                      role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
                  }}
                />
              </span>
              <span
                style={{
                  color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
                }}
              >
                {formik.isSubmitting ? "Searching..." : "Search"}
              </span>
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
        return (
          <JobSeekerFilter
            formik={formik}
            footer={footer()}
            responsive={responsive}
          />
        );
      case SEARCH_TYPE.talents:
        return (
          <TalentFilter
            formik={formik}
            footer={footer()}
            responsive={responsive}
          />
        );
      case SEARCH_TYPE.tenders:
        return (
          <TenderFilter
            formik={formik}
            footer={footer()}
            responsive={responsive}
          />
        );
      case SEARCH_TYPE.vendors:
        return (
          <VendorFilter
            formik={formik}
            footer={footer()}
            responsive={responsive}
          />
        );
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
  const getSearchUserFilter = async () => {
    const data = await getSearchUserFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
    }
  };
  const getSearchTenderFilter = async () => {
    const data = await getSearchTenderFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
    }
  };

  const getSearchVendorFilter = async () => {
    const data = await getSearchVendorFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
    }
  };

  const handleSelectFilter = async (filter) => {
    setSelectedFilter(filter.id);
    dispatch(setSearching(true));
    formik.setFieldValue("id", filter.id);
    formik.setFieldValue("jobCategories", filter.jobCategories?.[0]);
    formik.setFieldValue("jobSubCategories", filter.jobSubCategory || []);
    formik.setFieldValue(
      "country",
      filter.country?.id ||
        (typeof filter.country === "string" ? filter.country : "")
    );
    formik.setFieldValue("city", filter.city?.title);
    formik.setFieldValue("isFullTime", filter.isFullTime);
    formik.setFieldValue("isPartTime", filter.isPartTime);
    formik.setFieldValue("hasContract", filter.hasContract);
    formik.setFieldValue("available", filter.isAvailable);
    formik.setFieldValue("salaryMin", filter.salaryMin);
    formik.setFieldValue("salaryMax", filter.salaryMax);
    // tenders
    formik.setFieldValue("opportunityType", filter.opportunityType);
    formik.setFieldValue("sector", filter.sector);
    formik.setFieldValue("tag", filter.tag);
    formik.setFieldValue("tenderCategories", filter.tenderCategories);
    formik.setFieldValue("budgetMin", filter.budgetMin);
    formik.setFieldValue("budgetMax", filter.budgetMax);
    formik.setFieldValue("deadline", filter.deadline);
    // vendors
    formik.setFieldValue("yearsInMarket", filter.yearsInMarket);
    // running after 1 sec the handle submit because jobSubCategories API call need to be done
    setTimeout(() => {
      formik.handleSubmit();
    }, 1000);
  };

  const handleDeleteFilter = async (filterId) => {
    const newAllFilters = allFilters.filter((filter) => filter.id !== filterId);
    setAllFilters([...newAllFilters]);
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        await deleteSearchJobsFilterAPI(filterId);
        break;
      case SEARCH_TYPE.talents:
        await deleteSearchUserFilterAPI(filterId);
        break;
      case SEARCH_TYPE.tenders:
        await deleteSearchTenderFilterAPI(filterId);
        break;
      case SEARCH_TYPE.vendors:
        await deleteSearchVendorFilterAPI(filterId);
        break;
      default:
        break;
    }
  };
  const handleReset = () => {
    formik.resetForm();
    setSelectedFilter("");
    dispatch(setAdvanceFilter(getObject()));
  };
  const handleSaveJobSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      job_category: rawData.jobCategories ? [rawData.jobCategories] : [],
      job_sub_category: rawData.jobSubCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
      salary_min: rawData.salaryMin,
      salary_max: rawData.salaryMax,
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
  const handleSaveUserSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      category: rawData.jobCategories ? [rawData.jobCategories] : [],
      sub_category: rawData.jobSubCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
      availability: rawData.available,
      salary_min: rawData.salaryMin,
      salary_max: rawData.salaryMax,
      role: USER_ROLES.jobSeeker,
    };
    if (rawData.country) {
      const city = cities.data[rawData.country].find(
        (city) => city.title === rawData.city
      );
      if (city && city.id) {
        data.city = city?.id;
      }
    }

    const res = await saveSearchUserFilterAPI(data);
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

  const handleSaveTenderSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      tender_category: rawData.tenderCategories,
      sector: rawData.sector,
      opportunity_type: rawData.opportunityType,
      tag: rawData.tag,
      budget_min: rawData.budgetMin,
      budget_max: rawData.budgetMax,
      deadline:
        rawData.deadline &&
        dayjs(rawData.deadline).format(DATABASE_DATE_FORMAT),
    };
    if (rawData.country) {
      const city = cities.data[rawData.country].find(
        (city) => city.title === rawData.city
      );
      if (city && city.id) {
        data.city = city?.id;
      }
    }

    const res = await saveSearchTenderFilterAPI(data);
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
  // Vendor
  const handleSaveVendorSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      // tender_category: rawData.tenderCategories,
      sector: rawData.sector,
      opportunity_type: rawData.opportunityType,
      tag: rawData.tag,
      years_in_market: rawData.yearsInMarket || null,
      role: USER_ROLES.vendor,
    };
    if (rawData.country) {
      const city = cities.data[rawData.country].find(
        (city) => city.title === rawData.city
      );
      if (city && city.id) {
        data.city = city?.id;
      }
    }

    const res = await saveSearchVendorFilterAPI(data);
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
      switch (searchType) {
        case SEARCH_TYPE.jobs:
          await updateSavedSearchFilterAPI(filterId, !currentStatus);
          break;
        case SEARCH_TYPE.talents:
          await updateSavedSearchUserFilterAPI(filterId, !currentStatus);
          break;
        case SEARCH_TYPE.tenders:
          await updateSavedSearchTenderFilterAPI(filterId, !currentStatus);
          break;
        case SEARCH_TYPE.vendors:
          await updateSavedSearchVendorFilterAPI(filterId, !currentStatus);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    handleReset();
  }, [location.pathname]);
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }

    if (!tenderCategories.data.length) {
      dispatch(getTenderCategories());
    }
    if (!opportunityTypes.data.length) {
      dispatch(getTenderOpportunityType());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
    if (!tags.data.length) {
      dispatch(getTenderTags());
    }
  }, []);
  useEffect(() => {
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        getSearchJobsFilter();
        break;
      case SEARCH_TYPE.talents:
        getSearchUserFilter();
        break;
      case SEARCH_TYPE.tenders:
        getSearchTenderFilter();
        break;
      case SEARCH_TYPE.vendors:
        getSearchVendorFilter();
        break;
      default:
        break;
    }
  }, [searchType]);

  const formik = useFormik({
    initialValues: getObject("from"),
    onSubmit: async (values) => {
      const country = countries.data.find(
        (country) => country.id === values.country
      );
      const payload = {
        country: country ? country.title : "",
        city: values.city,
        jobCategory: jobCategories.data.find(
          (val) => val.id === values.jobCategories
        )?.title,
        jobSubCategories: (values.jobSubCategories || [])
          .map((subCategories) => {
            return jobSubCategories.data[values.jobCategories]?.find(
              (subCategory) => subCategory.id === subCategories
            );
          })
          .filter((e) => e),
        experience: values.experience,
        fullTime: values.isFullTime,
        partTime: values.isPartTime,
        contract: values.hasContract,
        availability: values.available,
        salary_min: values.salaryMin,
        salary_max: values.salaryMax,
        // tender
        deadline:
          values.deadline &&
          dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        sector: values.sector?.map((sector) =>
          sectors.data.find((i) => i.id === sector)
        ),
        budget_min: values.budgetMin,
        budget_max: values.budgetMax,
        opportunityType: values.opportunityType?.map((type) =>
          opportunityTypes.data.find((i) => i.id === type)
        ),
        tag: values.tag?.map((tag) => tags.data.find((i) => i.id === tag)),
        tenderCategories: values.tenderCategories?.map((tenderCategory) =>
          tenderCategories.data.find((i) => i.id === tenderCategory)
        ),
        // vendor
        years_in_market: values.yearsInMarket,
      };
      dispatch(setAdvanceFilter(payload));
    },
  });
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
    if (
      formik.values.jobCategories &&
      !jobSubCategories.data[formik.values.jobCategories]?.length
    ) {
      dispatch(
        getJobSubCategories({ categoryId: formik.values.jobCategories })
      );
    }
  }, [formik.values.country, formik.values.jobCategories]);

  useEffect(() => {
    const categories = searchParams.get("categories");
    const tenderCategories = searchParams.get("tenderCategories");
    const country = searchParams.get("location");
    formik.setFieldValue("jobCategories", categories);
    if (tenderCategories) {
      formik.setFieldValue("tenderCategories", [tenderCategories]);
    }
    formik.setFieldValue("country", country);
    setTimeout(() => formik.handleSubmit(), 500);
  }, [searchParams]);
  return (
    <div>
      <div className={`${styles.searchResult}`}>
        <div
          className={`${styles.label} lables`}
          style={
            !isMobileView
              ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
          }
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
              maxWidth: { xs: "100%", lg: "100%" },
              width: "100%",
            }}
          >
            <ShowText
              defaultOpen={defaultOpen}
              data={data}
              setData={setData}
              matches={matches}
            />
            <Stack
              direction={"row"}
              spacing={1}
              overflow={responsive ? "" : "auto"}
              flexWrap={isMobileView ? "nowrap" : "wrap"}
              useFlexGap
              component={"ul"}
              sx={{
                p: 0,
                m: 0,
                width: isMobileView ? "100%" : null,
              }}
            >
              {allFilters.map((filter) => {
                return (
                  <MenuItem
                    disableRipple={true}
                    key={filter.id}
                    sx={{
                      "&.MuiButtonBase-root": {
                        padding: "0px !important",
                        "&:hover": { background: "#fff" },
                      },
                    }}
                  >
                    <SearchButton
                      disableRipple={true}
                      sx={{
                        wordBreak: "break-word !important",
                        background:
                          selectedFilter === filter.id
                            ? `${JOBSEEKERCOLOR} !important`
                            : "",
                        border:
                          selectedFilter === filter.id
                            ? `1px solid ${
                                role !== USER_ROLES.jobSeeker
                                  ? "#274593"
                                  : "#eea23d"
                              } !important`
                            : "",
                        height: isMobileView
                          ? "50px !important"
                          : matches
                          ? "42px !important"
                          : "42px !important",
                      }}
                      className={`${
                        selectedFilter === filter.id
                          ? styles.btninActive
                          : styles.btnActive
                      }`}
                      leftIcon={
                        <div
                          onClick={() => toggleNotificationStatus(filter.id)}
                        >
                          {filter.isNotification ? (
                            role === USER_ROLES.jobSeeker ? (
                              <SVG.Notificationactive />
                            ) : (
                              <SVG.Notificationactivewithblue />
                            )
                          ) : (
                            <SVG.Notificationinactive />
                          )}
                        </div>
                      }
                      text={
                        <Box
                          sx={{
                            wordBreak: "break-word !important",
                            overflow: "hidden",
                            overflowY: "auto",
                            height: "42px",
                            resize: "none",
                            display: "flex",
                            alignItems: "center",
                            width: isMobileView ? "50px" : "auto",
                            color:
                              selectedFilter === filter.id
                                ? "#000 !important"
                                : "gray !important",
                          }}
                          onClick={() => handleSelectFilter(filter)}
                        >
                          {filter.title}
                        </Box>
                      }
                      handleCross={() => {
                        // handleDeleteFilter(filter.id);
                        setFilterId(filter.id);
                        setShowDeleteConfirmation(!showDeleteConfirmation);
                      }}
                    />
                  </MenuItem>
                );
              })}
            </Stack>
          </Box>
          {isMobileView ? (
            <Box sx={{ pt: 2 }}>
              <>
                {!defaultOpen && (
                  <div
                    onClick={() => setData(!data)}
                    style={{
                      color:
                        role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
                      cursor: "pointer",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Advanced filter
                    {data ? (
                      <>
                        <span
                          style={{
                            marginLeft: "10px",
                            width: "18px",
                            display: "flex",
                            color:
                              role === USER_ROLES.jobSeeker
                                ? "#FFA500"
                                : "#274593",
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
                          color:
                            role === USER_ROLES.jobSeeker
                              ? "#FFA500"
                              : "#274593",
                        }}
                      >
                        {<SVG.Downarrow />}
                      </span>
                    )}
                  </div>
                )}
              </>
            </Box>
          ) : null}
          {!matches ? (
            <>
              {!defaultOpen && (
                <div
                  onClick={() => setData(!data)}
                  style={{
                    color:
                      role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
                    cursor: "pointer",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Advanced filter
                  {data ? (
                    <>
                      <span
                        style={{
                          marginLeft: "10px",
                          width: "18px",
                          display: "inline-block",
                          color:
                            role === USER_ROLES.jobSeeker
                              ? "#FFA500"
                              : "#274593",
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
                        color:
                          role === USER_ROLES.jobSeeker ? "#FFA500" : "#274593",
                      }}
                    >
                      {<SVG.Downarrow />}
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            ""
          )}
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
                case SEARCH_TYPE.talents:
                  handleSaveUserSearch(title);
                  break;
                case SEARCH_TYPE.tenders:
                  handleSaveTenderSearch(title);
                  break;
                case SEARCH_TYPE.vendors:
                  handleSaveVendorSearch(title);
                  break;
                default:
                  break;
              }
            }}
            handleCancel={handleToggleModel}
          />
        </DialogBox>
        <DialogBox
          open={showDeleteConfirmation}
          handleClose={() => setShowDeleteConfirmation(!showDeleteConfirmation)}
        >
          <div className="add-content">
            <h2 className="mb-4">Warning!</h2>
            <h3>Are you sure want to delete? 😉</h3>
            <div className="text-center mt-4">
              <OutlinedButton
                onClick={(e) => {
                  handleDeleteFilter(filterId);
                  setShowDeleteConfirmation(!showDeleteConfirmation);
                  e.preventDefault();
                }}
                title={<>Confirm</>}
                sx={{
                  "&.MuiButtonBase-root": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontSize: "16px",
                    padding: "6px 30px !important",
                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
          </div>
        </DialogBox>
      </div>
    </div>
  );
}

export default AdvanceFilter;
