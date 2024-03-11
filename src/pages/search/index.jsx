import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchInput from "../../components/searchInput";
import { SVG } from "../../assets/svg";
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { ComponentSelector } from "./helper";
import {
  JOB_ORDER_BY,
  JOB_SORT_BY,
  TENDER_ORDER_BY,
  TENDER_SORT_BY,
  SEARCH_TYPE,
  USER_ROLES,
} from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import {
  searchJobs,
  searchTalent,
  searchTender,
  searchVendor,
  setJobPage,
  setTotalItems,
} from "../../redux/slice/search";
import AdvanceFilter from "./advanceFilter";
import { Capacitor } from "@capacitor/core";
import { getAdSenseAPI } from "@api/adSense";
import { setAdSense } from "@redux/slice/adSense";
import Tabs from "@pages/tabs/tabs";
import HeaddingSearch from "./hedding-search";
function Search({ searchTypeForJob }) {
  const platform = Capacitor.getPlatform();
  const params = useParams();
  const dispatch = useDispatch();
  const {
    auth: { role },
    search: { totalItems, totalPages, page, advanceFilter },
  } = useSelector((state) => state);
  const { jobs, tenders } = useSelector((state) => state.search);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Jobs");
  const Component = ComponentSelector(searchType || searchTypeForJob);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState(JOB_SORT_BY.created);
  const [orderBy, setOrderBy] = useState(JOB_ORDER_BY.descending);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("1");
  const { adSense } = useSelector((state) => state.adSense);
  const { isMobileView } = useSelector((state) => state.platform);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSorting = (shortBy, orderBy) => {
    setSortBy(shortBy);
    setOrderBy(orderBy);
  };
  const handleSearch = (value) => {
    setSearchParams({ search: value });
    if (!value) {
      setSearch(value);
    }
  };

  const handlePageChange = (page) => {
    dispatch(setJobPage(page));
  };
  const pageName = (searchType) => {
    switch (searchType) {
      case "jobs":
        setSearchName("Job feed");
        break;
      case "tenders":
        setSearchName("Browse tenders");
        break;
      case "talents":
        setSearchName("Browse talents");
        break;
      case "vendors":
        setSearchName("Search vendors");
        break;
      default:
        setSearchName(searchType);
        return "Unknown search type"; // Adding a defaultcase
    }
  };
  const getAdSenseList = async () => {
    const response = await getAdSenseAPI();
    if (response.remote === "success") {
      dispatch(setAdSense(response.data));
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    setSearchType(params.type);
    const search = searchParams.get("search") || "";
    pageName(params.type);
    setSearch(search);
  }, [params]);

  useEffect(() => {
    if (adSense.data.length < 1) {
      getAdSenseList();
    }
  }, [adSense]);

  useEffect(() => {
    dispatch(setTotalItems(0));
    let payload;

    if (sortBy === JOB_SORT_BY.active || sortBy === JOB_SORT_BY.expired) {
      payload = {
        search,
        order_by: orderBy,
        filter_by: sortBy,
      };
    } else {
      payload = {
        search,
        order_by: orderBy,
        search_by: sortBy,
      };
    }

    switch (params.type || searchTypeForJob) {
      case SEARCH_TYPE.jobs:
        setSearchPlaceHolder("Jobs");
        dispatch(searchJobs(payload));
        break;
      case SEARCH_TYPE.talents:
        setSearchPlaceHolder("talents");
        dispatch(searchTalent(payload));
        break;
      case SEARCH_TYPE.tenders:
        setSearchPlaceHolder("tenders");
        dispatch(searchTender(payload));
        break;
      case SEARCH_TYPE.vendors:
        setSearchPlaceHolder("vendors");
        dispatch(searchVendor(payload));
        break;
      default:
        break;
    }
  }, [search, page, totalPages, advanceFilter, searchType, orderBy, sortBy]);

  const pagination = () => {
    return (
      <Pagination
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: "Bahnschrift",
            fontSize: "16px",
          },
          "& .Mui-selected": {
            color: "#000 !important",
            background: "#fff !important",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              background:
                role === USER_ROLES.jobSeeker
                  ? "#eea23d !important"
                  : "#274593 !important",
              color:
                role === USER_ROLES.jobSeeker
                  ? "#fff !important"
                  : "#fff !important",
            },
          },
        }}
        color="primary"
        count={totalPages}
        onChange={(_, page) => {
          handlePageChange(page);
        }}
        page={page}
      />
    );
  };
  return (
    <Box
      className={`${styles.body}`}
      sx={{
        marginTop: platform === "android" || platform === "ios" ? "" : "118px",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          padding:
            platform === "android" || platform === "ios" ? "0px" : "0px 16px",
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        {isMobileView ? (
          <>
            <Box sx={{ px: 3, pt: 3 }}>
              <HeaddingSearch
                title="Browse talents"
                count={
                  <Box
                    component={"span"}
                    sx={{
                      background: "#D5E3F7",
                      padding: "5px 12px",
                      borderRadius: "73px",
                      fontFamily: "Bahnschrift",
                      fontWeight: 600,
                      fontSize: "14px",
                      ml: 1,
                    }}
                  >
                    2,513
                  </Box>
                }
                icon={
                  <IconButton>
                    <SVG.CalendarMonth />
                  </IconButton>
                }
              />
            </Box>
          </>
        ) : (
          ""
        )}

        <Grid container spacing={2}>
          <Grid
            item
            lg={3.5}
            sx={{
              display: { xs: "none", lg: "block" },
              // position: "sticky",
              // top: "60px",
              // height: "580px",
              // overflow: "hidden",
            }}
          >
            <AdvanceFilter
              searchType={searchType || searchTypeForJob}
              defaultOpen
              responsive
            />
          </Grid>
          <Grid item lg={8.5} xs={12}>
            <Box
              sx={{
                padding:
                  platform === "android" || platform === "ios"
                    ? "0px 16px"
                    : "",
              }}
            >
              <SearchInput
                key={searchType}
                svg={
                  <SVG.Buttonsearch
                    color={
                      role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593"
                    }
                  />
                }
                placeholder={`Search ${searchPlaceHolder}`}
                handleSearch={handleSearch}
                value={search}
                maxLength={50}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "block", lg: "none" },
                padding:
                  platform === "android" || platform === "ios"
                    ? "0px 16px"
                    : "",
              }}
            >
              <AdvanceFilter searchType={searchType || searchTypeForJob} />
            </Box>
            {(platform === "android" || platform === "ios") &&
            (role === USER_ROLES.vendor || role === USER_ROLES.employer) ? (
              <Box
                sx={{
                  marginTop: { lg: "24px", xs: "24px" },
                  background: "#fff",
                  padding: "10px 16px 0px",
                  borderRadius: "15px 15px 0px 0px",
                  marginBottom: "-10px",
                  "& .MuiTabs-indicator": {
                    background: "#274593 !important",
                  },
                }}
              >
                <Tabs setValue={setValue} value={value} role={role} />
              </Box>
            ) : (
              <></>
            )}
            {value !== "2" && (
              <>
                <Box
                  className={`${styles.jobcards}`}
                  sx={{
                    minHeight: "450px",
                    marginTop:
                      platform === "android" || platform === "ios"
                        ? ""
                        : "24px",
                  }}
                >
                  <div className="saved-jobs">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <h2 className="m-0">
                        {searchName}
                        <Chip
                          label={totalItems}
                          className="ms-3"
                          sx={{
                            background:
                              role === USER_ROLES.jobSeeker
                                ? "#FEEFD3"
                                : "#D5E3F7",
                            color:
                              role === USER_ROLES.jobSeeker
                                ? "#EEA23D"
                                : "#274593",
                            fontFamily: "Bahnschrift",
                            fontSize: "16px",
                            padding: "5px 4px !important",
                          }}
                        />
                      </h2>
                      {(searchType === SEARCH_TYPE.jobs && jobs.length) ||
                      (searchType === SEARCH_TYPE.tenders && tenders.length) ? (
                        <>
                          <IconButton
                            sx={{ width: "50px", height: "50px" }}
                            onClick={handleClick}
                          >
                            {<SVG.FillterICon />}
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: "visible",
                                filter:
                                  "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                "&:before": {
                                  content: '""',
                                  display: "block",
                                  position: "absolute",
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "background.paper",
                                  transform: "translateY(-50%) rotate(45deg)",
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                          >
                            <h5 className="px-3 mt-0 mb-1">Sort by :</h5>
                            {SEARCH_TYPE.jobs === searchType &&
                              [
                                {
                                  label: "Newest",
                                  sortBy: JOB_SORT_BY.created,
                                  orderBy: JOB_ORDER_BY.descending,
                                },
                                {
                                  label: "Oldest",
                                  sortBy: JOB_SORT_BY.created,
                                  orderBy: JOB_ORDER_BY.ascending,
                                },
                                {
                                  label: "Active",
                                  sortBy: JOB_SORT_BY.active,
                                  orderBy: JOB_ORDER_BY.ascending,
                                },
                                {
                                  label: "Expired",
                                  sortBy: JOB_SORT_BY.expired,
                                  orderBy: JOB_ORDER_BY.ascending,
                                },
                              ].map((data) => {
                                return (
                                  <MenuItem
                                    key={data.label}
                                    onClick={() => {
                                      handleClose();
                                      handleSorting(data.sortBy, data.orderBy);
                                    }}
                                    className="fillterbox"
                                    sx={{
                                      backgroundColor:
                                        sortBy === data.sortBy &&
                                        orderBy === data.orderBy
                                          ? role === USER_ROLES.jobSeeker
                                            ? "#FEEFD3"
                                            : "#D5E3F7"
                                          : "",
                                    }}
                                  >
                                    {data.label}
                                  </MenuItem>
                                );
                              })}

                            {SEARCH_TYPE.tenders === searchType &&
                              [
                                {
                                  label: "Newest",
                                  sortBy: TENDER_SORT_BY.created,
                                  orderBy: TENDER_ORDER_BY.descending,
                                },
                                {
                                  label: "Oldest",
                                  sortBy: TENDER_SORT_BY.created,
                                  orderBy: TENDER_ORDER_BY.ascending,
                                },
                                {
                                  label: "Active",
                                  sortBy: TENDER_SORT_BY.active,
                                  orderBy: TENDER_ORDER_BY.ascending,
                                },
                                {
                                  label: "Expired",
                                  sortBy: TENDER_SORT_BY.expired,
                                  orderBy: TENDER_ORDER_BY.ascending,
                                },
                              ].map((data) => {
                                return (
                                  <MenuItem
                                    key={data.label}
                                    onClick={() => {
                                      handleClose();
                                      handleSorting(data.sortBy, data.orderBy);
                                    }}
                                    className="fillterbox"
                                    sx={{
                                      backgroundColor:
                                        sortBy === data.sortBy &&
                                        orderBy === data.orderBy
                                          ? role === USER_ROLES.vendors
                                            ? "#FEEFD3"
                                            : "#D5E3F7"
                                          : "",
                                    }}
                                  >
                                    {data.label}
                                  </MenuItem>
                                );
                              })}
                          </Menu>
                        </>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </div>
                  <Component />
                </Box>
                {totalPages > 1 ? (
                  <div className="paginations pt-4">{pagination()}</div>
                ) : (
                  <div style={{ marginTop: "20px" }}></div>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Search;
