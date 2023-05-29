import { ComingSoonAnimation } from "@components/animations";
import { JobSearch } from "./jobSearch";
import { TalentSearch } from "./talentSearch";
import { TenderSearch } from "./tenderSearch";
import { SEARCH_TYPE } from "@utils/enum";
import { VendorSearch } from "./vendorSearch";

export const ComponentSelector = (type) => {
  switch (type) {
    case SEARCH_TYPE.jobs:
      return JobSearch;
    case SEARCH_TYPE.talents:
      return TalentSearch;
    case SEARCH_TYPE.tenders:
      return TenderSearch;
    case SEARCH_TYPE.vendors:
      return VendorSearch;
    default:
      return function DefaultSearch() {
        return (
          <div>
            <ComingSoonAnimation />
          </div>
        );
      };
  }
};
