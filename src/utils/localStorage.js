export const globalLocalStorage = {
  setAccessToken: (accessToken) => {
    localStorage.setItem("x-access", accessToken);
  },
  removeAccessToken: () => {
    localStorage.removeItem("x-access");
  },
  getAccessToken: () => localStorage.getItem("x-access"),
  setRefreshToken: (refreshToken) => {
    localStorage.setItem("x-refresh", refreshToken);
  },
  removeRefreshToken: () => {
    localStorage.removeItem("x-refresh");
  },
  getRefreshToken: () => localStorage.getItem("x-refresh"),
};
