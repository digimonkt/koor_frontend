import AdSenseCard from "@components/adSense";
import { NoDataFoundAnimation } from "../../../components/animations";
import TalentCard from "../../../components/talentCard";
import TalentCardSkeletonLoader from "../../../components/talentCard/talentCardSkeletonLoader";
import React from "react";
import { useSelector } from "react-redux";
import { AD_AFTER_RECORDS } from "@utils/constants/constants";

function TalentSearchComponent() {
  const { talents, isSearching } = useSelector((state) => state.search);
  const { adSense } = useSelector((state) => state.adSense);
  const adSenseData = adSense.data.find(
    (item) => item.pageName === "browseTalents",
  );
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
        talents.map((talent, index) => {
          index = index + 1;
          return (
            <React.Fragment key={talent.id}>
              <TalentCard logo talentDetails={talent} />
              <AdSenseCard
                code={adSenseData?.code}
                show={index > 0 && index % AD_AFTER_RECORDS === 0}
              />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default TalentSearchComponent;
