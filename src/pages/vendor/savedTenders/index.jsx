import { getSaveTenderAPI } from "@api/vendor";
import { NoDataFoundAnimation } from "@components/animations";
import TenderCard from "@components/tenderCard";
import TenderCardSkeletonLoader from "@components/tenderCard/tenderCardSkeletonLoader";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

function SavedTendersComponent() {
  const [totalSavedTenders, setTotalSavedTenders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [savedTendersList, setSavedTendersList] = useState([]);
  const getSavedTendersList = async (data) => {
    setIsLoading(true);
    const res = await getSaveTenderAPI(data);
    if (res.remote === "success") {
      setTotalSavedTenders(res.data.count);
      setSavedTendersList(res.data.results);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getSavedTendersList();
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
              Saved tenders
              <Chip
                label={totalSavedTenders}
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
          ) : !savedTendersList.length ? (
            <NoDataFoundAnimation title="You haven't saved any tenders yet." />
          ) : (
            savedTendersList.map((list) => {
              return (
                <div
                  style={{ borderBottom: "1px solid #cacaca" }}
                  key={list.id}
                >
                  <TenderCard logo tenderDetails={list.tender} />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SavedTendersComponent;
