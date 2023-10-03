import { Card, CardContent, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { getBlacklistAPI } from "@api/employer";
import { setTotalBlacklist } from "@redux/slice/employer";
import { useDispatch, useSelector } from "react-redux";
import { NoDataFoundAnimation } from "@components/animations";
import BlacklistCardSkeletonLoading from "@components/blacklistCard/blacklistCardSkeletonLoading";
import BlacklistCard from "@components/blacklistCard";
function Blacklist() {
  const dispatch = useDispatch();
  const [blacklistData, setBlacklistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [unBlockUserId, setUnBlockUserId] = useState(false);
  const { totalBlacklist } = useSelector((state) => state.employer);
  const getBlacklistData = useCallback(async () => {
    setIsLoading(true);
    const res = await getBlacklistAPI({ search });
    if (res.remote === "success") {
      setBlacklistData(res.data.results);
      dispatch(setTotalBlacklist(res.data.count));
    }
    setIsLoading(false);
  }, [search]);

  useEffect(() => {
    getBlacklistData();
  }, [isSearching, totalBlacklist]);

  useEffect(() => {
    const filterData = blacklistData.filter((item) => item.user.id === unBlockUserId);

    setBlacklistData(filterData);
  }, [unBlockUserId]);

  return (
    <div className="py-3">
      <div className="mb-3">
        <Stack direction="row" spacing={0} className="searchjob-box">
          <input
            className="jobsearch"
            placeholder="Search Blacklist Candidate"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? setIsSearching(!isSearching) : null
            }
          />
          <button
            className="jobt-btn-search"
            onClick={() => setIsSearching(!isSearching)}
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
            [1, 2, 3].map((loader) => (
              <BlacklistCardSkeletonLoading key={loader} />
            ))
          ) : !blacklistData.length ? (
            <NoDataFoundAnimation title="No blacklisted found" />
          ) : (
            blacklistData.map((item, index) => (
              <BlacklistCard
                details={item.user}
                reason={item.reason}
                key={index}
                handleUnblockUserId={(userId) => setUnBlockUserId(userId)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Blacklist;
