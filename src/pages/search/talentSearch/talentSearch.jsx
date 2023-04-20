import { NoDataFoundAnimation } from "@components/animations";
import TalentCard from "@components/talentCard";
import TalentCardSkeletonLoader from "@components/talentCard/talentCardSkeletonLoader";
import React from "react";
import { useSelector } from "react-redux";

function TalentSearchComponent() {
  const { talents, isSearching } = useSelector((state) => state.search);
  return (
    <div>
      {isSearching ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
              <TalentCardSkeletonLoader />
            </React.Fragment>
          );
        })
      ) : !talents.length ? (
        <NoDataFoundAnimation title="We apologize, but there doesn't seem to be any available talent matching your search criteria." />
      ) : (
        talents.map((talent) => {
          return (
            <React.Fragment key={talent.id}>
              <TalentCard logo talentDetails={talent} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default TalentSearchComponent;
