import { USER_ROLES } from "./enum";

export const getColorByRemainingDays = (days) => {
  // const limit = 50;
  // const value = days > limit ? 0 : 1 - days / limit;
  // // value from 0 to 1
  // const hue = ((1 - value) * 120).toString(10);
  // return `hsl(${hue}, 100%, 50%)`;
  if (days >= 5) {
    return "#419C55"; // Green for days greater than 15
  } else if (days >= 1 && days < 5) {
    return "#EBB938"; // Yellow for days between 1 and 15
  } else if (days === 0) {
    return "#BE4444"; // Red for 0 days
  } else {
    return "#BE4444"; // Default color (you can change this to another color if needed)
  }
};

export const getColorByRole = (role) => {
  switch (role) {
    case USER_ROLES.vendor:
      return "#274593";
    case USER_ROLES.employer:
      return "#274593";
    case USER_ROLES.jobSeeker:
      return "#FFA500";
    default:
      return "#FFA500";
  }
};
