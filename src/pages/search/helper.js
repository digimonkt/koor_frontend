import { ComingSoonAnimation } from "@components/animations";
import { JobSearch } from "./jobSearch";
import { TalentSearch } from "./talentSearch";
import { SEARCH_TYPE } from "@utils/enum";
import { VendorSearch } from "./vendorSearch";

export const ComponentSelector = (type) => {
  switch (type) {
    case SEARCH_TYPE.jobs:
      return JobSearch;
    case SEARCH_TYPE.talents:
      return TalentSearch;
<<<<<<< HEAD
=======
    case SEARCH_TYPE.tenders:
      return TenderSearch;
    case SEARCH_TYPE.vendors:
      return VendorSearch;
>>>>>>> a22fb17987cacc5ad6ce8a2bcf83e4672ae45b4d
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
