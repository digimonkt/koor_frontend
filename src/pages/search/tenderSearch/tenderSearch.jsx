import { NoDataFoundAnimation } from "@components/animations";
import TenderCard from "@components/tenderCard";
import TenderCardSkeletonLoader from "@components/tenderCard/tenderCardSkeletonLoader";

import React from "react";
import { useSelector } from "react-redux";

function TenderSearchComponent() {
  const { tenders, isSearching } = useSelector((state) => state.search);
  return (
    <div>
      {isSearching ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
              <TenderCardSkeletonLoader logo />
            </React.Fragment>
          );
        })
      ) : !tenders.length ? (
        <NoDataFoundAnimation title="We apologize, but there doesn't seem to be any available tender matching your search criteria." />
      ) : (
        tenders.map((tender) => {
          return (
            <React.Fragment key={tender.id}>
              <TenderCard logo selfTender tenderDetails={tender} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default TenderSearchComponent;
