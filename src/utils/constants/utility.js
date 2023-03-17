export const processRoleToDisplay = (role) => {
  if (!role) return role;
  const newRole = role.split("_");
  for (let i = 0; i < newRole.length; i++) {
    newRole[i] = newRole[i][0].toUpperCase() + newRole[i].substr(1);
  }
  return newRole.join(" ");
};
