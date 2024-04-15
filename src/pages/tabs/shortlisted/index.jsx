import AdSenseCard from "@components/adSense";
import { NoDataFoundAnimation } from "../../../components/animations";
import ShortlistedCard from "./shortlistedCard";
import TalentCardSkeletonLoader from "../../../components/talentCard/talentCardSkeletonLoader";
import React, { useEffect, useState } from "react";
import { AD_AFTER_RECORDS } from "@utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationByFilterAPI } from "@api/employer";
import { setSearchTrue } from "@redux/slice/search";

function ShortlistedTab() {
  const { isSearching } = useSelector((state) => state.search);
  const { adSense } = useSelector((state) => state.adSense);
  const dispatch = useDispatch();
  const [applicantDetails, setApplicantDetails] = useState({});
  console.log(isSearching);
  const getApplicantsData = async () => {
    dispatch(setSearchTrue(true));
    const res = await getApplicationByFilterAPI("shortlisted");
    if (res?.remote === "success") {
      setApplicantDetails(res.data);
    }
    dispatch(setSearchTrue(false));
  };

  const adSenseData = adSense.data.find(
    (item) => item.pageName === "browseTalents"
  );

  useEffect(() => {
    getApplicantsData();
  }, [applicantDetails?.user?.id]);
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
      ) : !applicantDetails.length ? (
        <NoDataFoundAnimation title="We apologize, but there doesn't seem to be any available talent matching your search criteria." />
      ) : (
        applicantDetails.map((data, index) => {
          index = index + 1;
          return (
            <React.Fragment key={data.id}>
              <ShortlistedCard applicantDetails={data} />
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

export default ShortlistedTab;
