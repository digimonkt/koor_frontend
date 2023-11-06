export const getColorByRemainingDays = (days) => {
  // const limit = 50;
  // const value = days > limit ? 0 : 1 - days / limit;
  // // value from 0 to 1
  // const hue = ((1 - value) * 120).toString(10);
  // return `hsl(${hue}, 100%, 50%)`;
  if (days >= 15) {
    return "#419C55"; // Green for days greater than 15
  } else if (days >= 1 && days < 15) {
    return "#EBB938"; // Yellow for days between 1 and 15
  } else if (days === 0) {
    return "#BE4444"; // Red for 0 days
  } else {
    return "#BE4444"; // Default color (you can change this to another color if needed)
  }
};
