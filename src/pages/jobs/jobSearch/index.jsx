import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Container,
  Stack,
  Chip,
  IconButton,
  Menu,
  Divider,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SVG } from "@assets/svg";
import JobCard from "@components/jobCard";
import AdvanceFilter from "./AdvanceFilter";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchJobsAPI } from "@api/job";
import Pagination from "@components/pagination";
import SearchInput from "@components/searchInput";
import { JOB_ORDER_BY, JOB_SORT_BY } from "@utils/enum";
import { NoDataFoundAnimation } from "@components/animations";
import Loader from "@components/loader";

const LIMIT = 10;
export default function JobSearch() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [sortBy, setSortBy] = useState(JOB_SORT_BY.salary);
  const [orderBy, setOrderBy] = useState(JOB_ORDER_BY.ascending);
  const [isSearching, setIsSearching] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [searchParams, setSearchParams] = useSearchParams({});
  const handleSearch = (value) => {
    setSearchParams({ search: value });
    if (!value) {
      setSearch(value);
    }
  };
  const getSearchJobs = async (data) => {
    setIsSearching(true);
    if (data) {
      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }
    }
    const res = await getSearchJobsAPI({
      search,
      page,
      limit: LIMIT,
      ...data,
    });
    if (res.remote === "success") {
      const totalJobs = res.data.count;
      setTotalJobs(totalJobs);
      const pages = Math.ceil(totalJobs / LIMIT);
      setTotalPages(pages);
      setSearchedJobs(res.data.results);
      setIsSearching(false);
    } else {
      setIsSearching(false);
    }
  };

  const handleSorting = (search) => {
    setSortBy(search);
    if (orderBy === "ascending") {
      setOrderBy("descending");
    } else {
      setOrderBy("ascending");
    }
  };
  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    const search = searchParams.get("search");
    if (search) {
      setPage(1);
      setTotalPages(1);
      setSearch(search);
    }
  }, [location.search]);
  useEffect(() => {
    if (totalPages >= page || totalPages === 0) {
      getSearchJobs({
        search_by: sortBy,
        order_by: orderBy,
      });
    }
  }, [search, page, orderBy]);
  const pagination = () => {
    return (
      <Pagination
        count={totalPages}
        onChange={(e, page) => {
          setPage(page);
        }}
        page={page}
      />
    );
  };
  return (
    <div className={`${styles.body}`}>
      <SearchInput
        svg={<SVG.Buttonsearch />}
        placeholder="Search jobs"
        handleSearch={handleSearch}
        value={search}
      />
      <Container>
        <AdvanceFilter
          getSearchJobs={getSearchJobs}
          totalJobs={totalJobs}
          searchKeyword={search}
        />
      </Container>
      <div className="paginations ">
        <Container>{pagination()}</Container>
      </div>
      <Container>
        <div className={`${styles.jobcards}`}>
          <div className="saved-jobs">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="m-0">
                Job feed
                <Chip
                  label={totalJobs}
                  className="ms-3"
                  sx={{
                    background: "#FEEFD3",
                    color: "#EEA23D",
                    fontFamily: "Bahnschrift",
                    fontSize: "16px",
                  }}
                />
              </h2>
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
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <h5 className="px-3 mt-0 mb-1">Sort by:</h5>
                <MenuItem
                  onClick={() => {
                    handleSorting(JOB_SORT_BY.salary);
                  }}
                  className="fillterbox"
                >
                  Salary
                  <span>
                    {sortBy === JOB_SORT_BY.salary &&
                      (orderBy === JOB_ORDER_BY.ascending ? (
                        <SVG.ArrowDownward />
                      ) : (
                        <SVG.ArrowUpward />
                      ))}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    // handleClose();
                    handleSorting(JOB_SORT_BY.expiration);
                  }}
                  className="fillterbox"
                >
                  Expiration
                  <span>
                    {sortBy === JOB_SORT_BY.expiration &&
                      (orderBy === JOB_ORDER_BY.ascending ? (
                        <SVG.ArrowDownward />
                      ) : (
                        <SVG.ArrowUpward />
                      ))}
                  </span>
                </MenuItem>
                {/* <MenuItem onClick={handleClose} className="fillterbox">
                  Workload <span className="ms-3">{<SVG.ArrowUpward />}</span>
                </MenuItem> */}
              </Menu>
            </Stack>
          </div>
          {isSearching ? (
            <div
              style={{
                marginLeft: "50%",
                marginTop: "10%",
                height: "250px",
              }}
            >
              <Loader loading={isSearching} />
            </div>
          ) : !searchedJobs.length ? (
            <NoDataFoundAnimation title="No Job Found" />
          ) : (
            searchedJobs.map((job) => {
              return (
                <React.Fragment key={job.id}>
                  <JobCard logo jobDetails={job} />
                  <Divider />
                </React.Fragment>
              );
            })
          )}
        </div>
      </Container>
      <div className="paginations pt-4">
        <Container>{pagination()}</Container>
      </div>
    </div>
  );
}
