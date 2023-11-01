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
