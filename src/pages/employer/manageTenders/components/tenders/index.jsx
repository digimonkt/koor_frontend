import React, { useCallback, useState, useEffect } from "react";
import { Box, Card, CardContent, Stack } from "@mui/material";
import { SVG } from "../../../../../assets/svg";

import { getTenderAPI } from "../../../../../api/employer";
import { useDispatch, useSelector } from "react-redux";
import { setTotalTenders } from "../../../../../redux/slice/employer";
import TenderCard from "../../../../../components/tenderCard";
import ApplicantList from "../applicantList";
import { NoDataFoundAnimation } from "../../../../../components/animations";
import TenderCardSkeletonLoader from "../../../../../components/tenderCard/tenderCardSkeletonLoader";
import EmployerMyPostTabs from "@pages/employer/employerMyPostTabs/employerMyPostTabs";

const Tenders = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const { isMobileView } = useSelector(({ platform }) => platform);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [manageTenderList, setManageTenderList] = useState([]);
  const getTenderList = useCallback(async () => {
    setIsLoading(true);
    const response = await getTenderAPI({ search });
    if (response.remote === "success") {
      setManageTenderList(response.data.results);
      dispatch(setTotalTenders(response.data.count));
    } else {
      console.log(response.error);
    }
    setIsLoading(false);
  }, [search]);
  useEffect(() => {
    getTenderList();
  }, [isSearching]);

  return (
    <>
      <div className="py-3">
        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        ></Box>
        <div className="mb-3">
          <Stack direction="row" spacing={0} className="searchjob-box">
            <input
              className="jobsearch"
              placeholder="Search your tenders"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? setIsSearching(!isSearching) : null
              }
            />
            <button
              className="jobt-btn-search"
              onClick={() => setIsSearching(!isSearching)}
            >
              <SVG.SearchIConJob />
            </button>
          </Stack>
        </div>
        {isLoading ? (
          [1, 2, 3, 4, 5].map((loader) => {
            return (
              <React.Fragment key={loader}>
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
                    <TenderCardSkeletonLoader />
                  </CardContent>
                </Card>
              </React.Fragment>
            );
          })
        ) : !manageTenderList.length ? (
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                mb: 3,
              },
            }}
          >
            {isMobileView && <EmployerMyPostTabs onTabChange={onTabChange} />}
            <NoDataFoundAnimation title="No tender found." />
          </Card>
        ) : (
          manageTenderList.map((tender, index) => (
            <Card
              key={index}
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
                {index === 0 && isMobileView && (
                  <EmployerMyPostTabs onTabChange={onTabChange} />
                )}
                <TenderCard tenderDetails={tender} selfTender={true} />
                {!isMobileView && (
                  <ApplicantList
                    tenderId={tender.id}
                    totalApplications={tender.vendor}
                  />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
};
export default Tenders;
