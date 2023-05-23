import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAppliedTendersAPI } from "@api/vendor";
import { NoDataFoundAnimation } from "@components/animations";
import TenderCardSkeletonLoader from "@components/tenderCard/tenderCardSkeletonLoader";
import TenderCard from "@components/tenderCard";

function AppliedTenderComponent() {
  const [appliedTenderList, setAppliedTenderList] = useState([]);
  const [totalAppliedTenders, setTotalAppliedTenders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const getAppliedTendersList = async (data) => {
    setIsLoading(true);
    const res = await getAppliedTendersAPI(data);
    if (res.remote === "success") {
      setTotalAppliedTenders(res.data.count);
      setAppliedTenderList(res.data.results);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAppliedTendersList();
  }, []);

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
          totalAppliedTenders,
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
              Applied Tenders
              <Chip
                label={totalAppliedTenders}
                className="ms-3"
                sx={{
                  background: "#FEEFD3",
                  color: "#EEA23D",
                  fontFamily: "Bahnschrift",
                  fontSize: "16px",
                }}
              />
            </h2>
          </Stack>
        </div>
        <div className="savedjobs">
          {isLoading ? (
            [1, 2, 3].map((loader) => (
              <div style={{ borderBottom: "1px solid #cacaca" }} key={loader}>
                <TenderCardSkeletonLoader logo />
              </div>
            ))
          ) : !appliedTenderList.length ? (
            <NoDataFoundAnimation title="It seems like you haven't submitted any tender applications yet." />
          ) : (
            appliedTenderList.map((list) => {
              return (
                <div
                  style={{ borderBottom: "1px solid #cacaca" }}
                  key={list.id}
                >
                  <TenderCard logo applied tenderDetails={list.tender} />
                  <Divider />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AppliedTenderComponent;
