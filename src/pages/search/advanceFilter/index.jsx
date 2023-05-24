import React, { useState, useEffect } from "react";
import styles from "./advanceFilter.module.css";
import { MenuItem, MenuList } from "@mui/material";
import { OutlinedButton, SearchButton } from "@components/button";
import { SVG } from "@assets/svg";
import {
  deleteSearchJobsFilterAPI,
  getSearchJobsFilterAPI,
  saveSearchJobsFilterAPI,
  updateSavedSearchFilterAPI,
} from "@api/job";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getJobCategories,
  getTenderOpportunityType,
  getTenderTags,
  getTenderCategories,
  getTenderSector,
} from "@redux/slice/choices";
import { setAdvanceFilter } from "@redux/slice/search";
import JobSeekerFilter from "./jobSeekerFilter";
import { useFormik } from "formik";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import SaveFilter from "./saveFilter";
import TalentFilter from "./talentFilter";
import { SEARCH_TYPE, USER_ROLES } from "@utils/enum";
import {
  DATABASE_DATE_FORMAT,
  SALARY_MAX,
  SALARY_MIN,
} from "@utils/constants/constants";
import {
  deleteSearchUserFilterAPI,
  getSearchUserFilterAPI,
  saveSearchUserFilterAPI,
  updateSavedSearchUserFilterAPI,
} from "@api/user";
import TenderFilter from "./tenderFilter";
import dayjs from "dayjs";
import {
  deleteSearchTenderFilterAPI,
  deleteSearchVendorFilterAPI,
  getSearchTenderFilterAPI,
  saveSearchTenderFilterAPI,
  saveSearchVendorFilterAPI,
  updateSavedSearchTenderFilterAPI,
  updateSavedSearchVendorFilterAPI,
} from "@api/vendor";
import VendorFilter from "./vendorFilter";
function AdvanceFilter({ searchType }) {
  const dispatch = useDispatch();
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
      category = jobCategories;
  }
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
        {isLoggedIn && (
          <span
            style={{ pointer: "cursor" }}
            onClick={() => {
              handleToggleModel();
            }}
          >
            {<SVG.Favorite />} SAVE SEARCH
          </span>
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
      case SEARCH_TYPE.tenders:
        return <TenderFilter formik={formik} footer={footer()} />;
      case SEARCH_TYPE.vendors:
        return <VendorFilter formik={formik} footer={footer()} />;
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
    const data = await getSearchTenderFilterAPI();
    if (data.remote === "success") {
      setAllFilters([...data.data]);
    }
    setAllFilters([...[]]);
  };

  const handleSelectFilter = async (filter) => {
    console.log({ filter });
    setSelectedFilter(filter.id);
    formik.setFieldValue("id", filter.id);
    formik.setFieldValue("jobCategories", filter.jobCategories);
    formik.setFieldValue("country", filter.country?.id || "");
    formik.setFieldValue("city", filter.city?.title || "");
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
    const payload = {
      country: filter.country?.title || "",
      city: filter.city?.title || "",
      jobCategory: (filter.jobCategories || []).map((jobCategory) => {
        return category.data.find((category) => category.id === jobCategory);
      }),
      fullTime: filter.isFullTime,
      partTime: filter.isPartTime,
      contract: filter.hasContract,
      isAvailable: filter.isAvailable,
      salaryMin: filter.salaryMin,
      salaryMax: filter.salaryMax,
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
        salaryMin: SALARY_MIN,
        salaryMax: SALARY_MAX,
        // tender
        budgetMin: "",
        budgetMax: "",
        deadline: "",
        sector: "",
        opportunityType: "",
        tag: "",
        // vendor
        yearsInMarket: "",
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
      category: [rawData.jobCategories],
      sub_category: rawData.jobSubCategories,
      is_full_time: rawData.isFullTime,
      is_part_time: rawData.isPartTime,
      has_contract: rawData.hasContract,
      availability: rawData.available,
      salary_min: rawData.salaryMin,
      salary_max: rawData.salaryMax,
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

  const handleSaveVendorSearch = async (title) => {
    const rawData = formik.values;
    const data = {
      title,
      country: rawData.country,
      tender_category: rawData.tenderCategories,
      sector: rawData.sector,
      opportunity_type: rawData.opportunityType,
      tag: rawData.tag,
      years_in_market: rawData.yearsInMarket,
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
    initialValues: {
      id: "",
      jobCategories: "",
      jobSubCategories: [],
      country: "",
      city: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,

      // talent
      available: false,
      salaryMin: SALARY_MIN,
      salaryMax: SALARY_MAX,
      experience: "",

      // tender
      budgetMin: "",
      budgetMax: "",
      sector: [],
      deadline: null,
      opportunityType: [],
      tag: [],
      tenderCategories: [],
      // vendor
      yearsInMarket: "",
    },

    onSubmit: async (values) => {
      const country = countries.data.find(
        (country) => country.id === values.country
      );
      const payload = {
        country: country ? country.title : "",
        city: values.city,
        jobCategory: values.jobCategories,
        jobSubCategories: values.jobSubCategories.map((subCategories) => {
          return jobSubCategories.data[values.jobCategories].find(
            (subCategory) => subCategory.id === subCategories
          );
        }),
        experience: values.experience,
        fullTime: values.isFullTime,
        partTime: values.isPartTime,
        contract: values.hasContract,
        isAvailable: values.available,
        salary_min: values.salaryMin,
        salary_max: values.salaryMax,
        // tender
        deadline:
          values.deadline &&
          dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        sector: values.sector.map(
          (sector) => sectors.data.find((i) => i.id === sector)?.title
        ),
        budget_min: values.budgetMin,
        budget_max: values.budgetMax,
        opportunityType: values.opportunityType.map(
          (type) => opportunityTypes.data.find((i) => i.id === type)?.title
        ),
        tag: values.tag,
        tenderCategories: values.tenderCategories.map(
          (tenderCategory) =>
            tenderCategories.data.find((i) => i.id === tenderCategory)?.title
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
                          onClick={() => toggleNotificationStatus(filter.id)}
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
      </div>
    </div>
  );
}

export default AdvanceFilter;
