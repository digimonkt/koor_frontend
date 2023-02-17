export const getColorByRemainingDays = (days) => {
  const limit = 20;
  const value = days > limit ? 0 : 1 - days / limit;
  // value from 0 to 1
  const hue = ((1 - value) * 120).toString(10);
  return `hsl(${hue}, 100%, 50%)`;
};
