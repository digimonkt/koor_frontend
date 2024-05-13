export const processRoleToDisplay = (role) => {
  if (!role) return role;
  const newRole = role.split("_");
  for (let i = 0; i < newRole.length; i++) {
    // newRole[i] = newRole[i][0].toUpperCase() + newRole[i].substr(1);
    newRole[i] = newRole[i][0] + newRole[i].substr(1);
  }
  return newRole.join("");
};

// 👇️ if you only need to capitalize the first letter
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const showDay = (days) => {
  if (days > 1) {
    return days + " days left";
  } else {
    return days + " day left";
  }
};

export const formatCommaText = (valueFiert, valueSecond) => {
  if (!valueFiert && !valueSecond) {
    return "";
  } else if (!valueFiert) {
    return valueSecond || "";
  } else if (!valueSecond) {
    return valueFiert || "";
  } else {
    return `${valueFiert}, ${valueSecond}`;
  }
};

export function getKeysByValue(object, value) {
  return Object.keys(object).filter((key) => object[key] === value);
}
