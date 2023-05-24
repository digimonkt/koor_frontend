import { Card, CardContent, Stack } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { SVG } from "@assets/svg";
import ApplicationCard from "@components/applicationCard";
import { getRecentApplicationAPI } from "@api/employer";
import dayjs from "dayjs";
import { setTotalApplications } from "@redux/slice/employer";
import { useDispatch } from "react-redux";
import { NoDataFoundAnimation } from "@components/animations";
import ApplicationCardSkeletonLoading from "@components/applicationCard/applicationCardSkeletonLoading";
function AllApplication() {
  const dispatch = useDispatch();

  const [recentApplication, setRecentApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const getRecentApplications = useCallback(async () => {
    setIsLoading(true);
    const res = await getRecentApplicationAPI({ search });
    if (res.remote === "success") {
      setRecentApplication(res.data.results);
      dispatch(setTotalApplications(res.data.count));
    }
    setIsLoading(false);
  }, [search]);
  useEffect(() => {
    getRecentApplications();
  }, [isSearching]);
  return (
    <div className="py-3">
      <div className="mb-3">
        <Stack direction="row" spacing={0} className="searchjob-box">
          <input
            className="jobsearch"
            placeholder="Search your jobs"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? setIsSearching(!isSearching) : null
            }
          />
          <button
            onClick={() => setIsSearching(!isSearching)}
            className="jobt-btn-search"
          >
            {<SVG.SearchIcon />}
          </button>
        </Stack>
      </div>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}
        >
          {isLoading ? (
            // skeleton loading need to be implemented
            [1, 2, 3].map((loader) => (
              <ApplicationCardSkeletonLoading key={loader} />
            ))
          ) : !recentApplication.length ? (
            <NoDataFoundAnimation title="You haven't received any job applications yet." />
          ) : (
            recentApplication.map((item, index) => (
              <ApplicationCard
                jobId={item.jobId}
                tenderId={item.jobId}
                details={item}
                subTitle={`Applied ${dayjs(item.createdAt).fromNow()}`}
                isDisabled={item.disabled}
                isShortlisted={item.shortlistedAt}
                isRejected={item.rejectedAt}
                isBlacklisted={item.user.isBlacklisted}
                key={index}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AllApplication;
