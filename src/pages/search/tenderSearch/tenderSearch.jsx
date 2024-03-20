import AdSenseCard from "@components/adSense";
import { NoDataFoundAnimation } from "../../../components/animations";
import TenderCard from "../../../components/tenderCard";
import TenderCardSkeletonLoader from "../../../components/tenderCard/tenderCardSkeletonLoader";
import { Divider } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AD_AFTER_RECORDS } from "@utils/constants/constants";

function TenderSearchComponent() {
  const { tenders, isSearching } = useSelector((state) => state.search);
  const { adSense } = useSelector((state) => state.adSense);
  const adSenseData = adSense.data.find(
    (item) => item.pageName === "browseTenders",
  );

  // fixing flecking issue by delayed loading of tender card
  const [renderTenderCard, setRenderTenderCard] = useState(false);
  useEffect(() => {
    if (!isSearching) {
      const timeoutId = setTimeout(() => {
        setRenderTenderCard(true);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isSearching]);
  return (
    <div>
      {!renderTenderCard || isSearching ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
              <TenderCardSkeletonLoader logo />
              <Divider />
            </React.Fragment>
          );
        })
      ) : !tenders.length ? (
        <NoDataFoundAnimation title="We apologize, but there doesn't seem to be any available tender matching your search criteria." />
      ) : (
        tenders.map((tender, index) => {
          index = index + 1;
          return (
            <React.Fragment key={tender.id}>
              {renderTenderCard && (
                <>
                  <TenderCard logo tenderDetails={tender} />
                  <AdSenseCard
                    code={adSenseData?.code}
                    show={index > 0 && index % AD_AFTER_RECORDS === 0}
                  />
                  <Divider />
                </>
              )}
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default TenderSearchComponent;
