import { ComingSoonAnimation } from "@components/animations";
import { JobSearch } from "./jobSearch";
import { TalentSearch } from "./talentSearch";
import { TenderSearch } from "./tenderSearch";
import { SEARCH_TYPE } from "@utils/enum";

export const ComponentSelector = (type) => {
  switch (type) {
    case SEARCH_TYPE.jobs:
      return JobSearch;
    case SEARCH_TYPE.talents:
      return TalentSearch;
    case SEARCH_TYPE.tenders:
      return TenderSearch;
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
