import { ComingSoonAnimation } from "@components/animations";
import { JobSearch } from "./jobSearch";
import { TalentSearch } from "./talentSearch";

export const ComponentSelector = (type) => {
  switch (type) {
    case "jobs":
      return JobSearch;
    case "talents":
      return TalentSearch;
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
