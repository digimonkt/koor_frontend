import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import JobCard from "@components/jobCard";
import { getSaveJobAPI } from "@api/jobSeeker";
import { JOB_ORDER_BY, JOB_SORT_BY } from "@utils/enum";
import JobCardSkeletonLoader from "@components/jobCard/jobCardSkeletonLoader";
import { NoDataFoundAnimation } from "@components/animations";

function SavedJobsComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [savedJobsList, setSavedJobList] = useState([]);
  const [totalSavedJobs, setTotalSavedJobs] = useState(0);
  const [orderBy, setOrderBy] = useState(JOB_ORDER_BY.ascending);
  const [sortBy, setSortBy] = useState(JOB_SORT_BY.salary);
  const [isLoading, setIsLoading] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getSavedJobsList = async (data) => {
    setIsLoading(true);
    const res = await getSaveJobAPI(data);
    if (res.remote === "success") {
      setTotalSavedJobs(res.data.count);
      setSavedJobList(res.data.results);
    }
    setIsLoading(false);
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
    getSavedJobsList({
      search_by: sortBy,
      order_by: orderBy,
    });
  }, [sortBy, orderBy]);
  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        },
      }}
    >
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            padding: "30px",
          },
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
              Saved jobs
              <Chip
                label={totalSavedJobs}
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
              <SVG.FilterIcon />
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
                  // handleClose();
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
              {/* <MenuItem
                onClick={() => {
                  handleClose();
                  // setSortBy("workload");
                  // handleSorting();
                }}
                className="fillterbox"
              >
                Workload
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
        <div className="savedjobs">
          {isLoading ? (
            [1, 2, 3].map((loader) => (
              <div style={{ borderBottom: "1px solid #cacaca" }} key={loader}>
                <JobCardSkeletonLoader logo />
              </div>
            ))
          ) : !savedJobsList.length ? (
            <NoDataFoundAnimation title="You haven't saved any jobs yet." />
          ) : (
            savedJobsList.map((list) => {
              return (
                <div
                  style={{ borderBottom: "1px solid #cacaca" }}
                  key={list.id}
                >
                  <JobCard logo jobDetails={list.job} />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SavedJobsComponent;
