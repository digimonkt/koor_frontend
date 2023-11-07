import AdSenseCard from "@components/adSense";
import { NoDataFoundAnimation } from "../../../components/animations";
import VendorCard from "../../../components/vendorCard";
import VendorCardSkeletonLoader from "../../../components/vendorCard/vendorCardSkeletonLoader";
import React from "react";
import { useSelector } from "react-redux";
import { AD_AFTER_RECORDS } from "@utils/constants/constants";

function VendorSearchComponent() {
  const { vendors, isSearching } = useSelector((state) => state.search);
  const { adSense } = useSelector((state) => state.adSense);
  const adSenseData = adSense.data.find((item) => item.pageName === "browseVendors");
  return (
    <div>
      {isSearching ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
              <VendorCardSkeletonLoader />
            </React.Fragment>
          );
        })
      ) : !vendors.length ? (
        <NoDataFoundAnimation title="We apologize, but there doesn't seem to be any available vendor  matching your search criteria." />
      ) : (
        vendors.map((vendor, index) => {
          index = index + 1;
          return (
            <React.Fragment key={vendor.id}>
              <VendorCard logo vendorDetails={vendor} />
              <AdSenseCard code={adSenseData.code} show={index > 0 && (index % AD_AFTER_RECORDS === 0)} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default VendorSearchComponent;
