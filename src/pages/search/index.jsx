import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import SearchInput from "@components/searchInput";
import { SVG } from "@assets/svg";
import {
  Chip,
  Container,
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
  SEARCH_TYPE,
  USER_ROLES,
} from "@utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { searchJobs, searchTalent, setJobPage } from "@redux/slice/search";
import AdvanceFilter from "./advanceFilter";
function Search() {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    auth: { role },
    search: { totalItems, totalPages, page, advanceFilter },
  } = useSelector((state) => state);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchType, setSearchType] = useState();
  const Component = ComponentSelector(searchType);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState(JOB_SORT_BY.salary);
  const [orderBy, setOrderBy] = useState(JOB_ORDER_BY.descending);
  const [search, setSearch] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSorting = (shortBy) => {
    const newOrderBy =
      orderBy === JOB_ORDER_BY.ascending
        ? JOB_ORDER_BY.descending
        : JOB_ORDER_BY.ascending;
    setSortBy(shortBy);
    setOrderBy(newOrderBy);
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

  useEffect(() => {
    setSearchType(params.type);
    const search = searchParams.get("search");
    if (search) {
      setSearch(search);
    }
  }, [params]);

  useEffect(() => {
    const payload = { search, order_by: orderBy, search_by: sortBy };
    switch (searchType) {
      case SEARCH_TYPE.jobs:
        dispatch(searchJobs(payload));
        break;
      case SEARCH_TYPE.talents:
        dispatch(searchTalent(payload));
        break;
      default:
        break;
    }
  }, [search, page, totalPages, advanceFilter, searchType, orderBy, sortBy]);
  const pagination = () => {
    return (
      <Pagination
        count={totalPages}
        onChange={(e, page) => {
          handlePageChange(page);
        }}
        page={page}
      />
    );
  };
  return (
    <div className={`${styles.body}`}>
      <SearchInput
        svg={
          <SVG.Buttonsearch
            color={role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593"}
          />
        }
        placeholder="Search jobs"
        handleSearch={handleSearch}
        value={search}
      />
      <Container>
        <AdvanceFilter searchType={searchType} />
      </Container>
      <div className="paginations">
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
              <h2 className="m-0" style={{ textTransform: "capitalize" }}>
                {searchType}
                <Chip
                  label={totalItems}
                  className="ms-3"
                  sx={{
                    background:
                      role === USER_ROLES.jobSeeker ? "#FEEFD3" : "#D5E3F7",
                    color:
                      role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593",
                    fontFamily: "Bahnschrift",
                    fontSize: "16px",
                  }}
                />
              </h2>
              {searchType === SEARCH_TYPE.jobs ? (
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
                        handleClose();
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
                        handleClose();
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
                  </Menu>
                </>
              ) : (
                ""
              )}
            </Stack>
          </div>
          <Component />
        </div>
      </Container>
      <div className="paginations pt-4">
        <Container>{pagination()}</Container>
      </div>
    </div>
  );
}

export default Search;
