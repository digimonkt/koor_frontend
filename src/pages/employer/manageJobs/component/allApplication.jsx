import { Card, CardContent, Stack } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { SVG } from "../../../../assets/svg";
import { getRecentApplicationAPI } from "../../../../api/employer";
import { setTotalApplications } from "../../../../redux/slice/employer";
import { useDispatch } from "react-redux";
import { NoDataFoundAnimation } from "../../../../components/animations";
import ApplicantCardSkeletonLoading from "@components/applicantCard/skeletonLoading";
import ApplicantCard from "../../../../components/applicantCard";
import EmployerMyPostTabs from "@pages/employer/employerMyPostTabs/employerMyPostTabs";
function AllApplication({ onTabChange }) {
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
            placeholder="Search for applicants"
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
          <EmployerMyPostTabs onTabChange={onTabChange} />
          {isLoading ? (
            [1, 2, 3].map((loader) => (
              <ApplicantCardSkeletonLoading key={loader} />
            ))
          ) : !recentApplication.length ? (
            <NoDataFoundAnimation title="You haven't received any job applications yet." />
          ) : (
            recentApplication.map((item, index) => (
              <ApplicantCard
                details={item}
                key={index}
                interviewPlanned
                shortlist
                reject
                blacklist
                view
                message
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AllApplication;
