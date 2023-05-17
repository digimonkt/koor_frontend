import { NoDataFoundAnimation } from "@components/animations";
import VendorCard from "@components/vendorCard";
import VendorCardSkeletonLoader from "@components/vendorCard/vendorCardSkeletonLoader";
import React from "react";
import { useSelector } from "react-redux";

function VendorSearchComponent() {
  const { vendors, isSearching } = useSelector((state) => state.search);
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
        vendors.map((vendor) => {
          return (
            <React.Fragment key={vendor.id}>
              <VendorCard logo vendorDetails={vendor} />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default VendorSearchComponent;
