import { JobSearch } from "./jobSearch";

export const ComponentSelector = (type) => {
  switch (type) {
    case "job":
      return JobSearch;
    case "talent":
      return function TalentSearch() {
        return <>Talent Search</>;
      };
    default:
      return JobSearch;
  }
};
