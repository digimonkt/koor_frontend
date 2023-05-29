import Header from "./components/header";
import React, { Suspense, useEffect } from "react";
import Footer from "./components/footer";
import {
  AUTHENTICATED_ROUTES,
  ROUTES,
  UNAUTHENTICATED_ROUTES,
} from "./utils/constants/routes";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizedRoute, UnauthorizedRoute } from "./utils/routes";
import { globalLocalStorage } from "@utils/localStorage";
import {
  getUserDetails,
  setCurrentLocation,
  setIsLoggedIn,
} from "@redux/slice/user";
import { ErrorToast, SuccessToast } from "@components/toast";
import { MESSAGE_TYPE } from "@utils/enum";
import { resetToast } from "@redux/slice/toast";
import { FallbackLoading } from "@components/loader/fallbackLoader";
import { firebaseInitialize } from "./firebaseProvider";
// eslint-disable-next-line no-unused-vars
import { getUserCountryByIpAPI, getUserIpAPI } from "@api/user";

function App() {
  const dispatch = useDispatch();
  const {
    auth: { isGlobalLoading, currentUser },
    toast: { message: toastMessage, type: toastType },
  } = useSelector((state) => state);
  const checkLoginStatus = () => {
    const accessToken = globalLocalStorage.getAccessToken();
    const refreshToken = globalLocalStorage.getRefreshToken();
    if (accessToken && refreshToken && !currentUser.id) {
      dispatch(getUserDetails());
    } else if (!accessToken || !refreshToken) {
      dispatch(setIsLoggedIn(false));
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    firebaseInitialize();
  }, []);
  useEffect(() => {
    const getPosition = async () => {
      const userIp = await getUserIpAPI();
      if (userIp.remote === "success") {
        const ip = userIp.data.ip;
        const res = await getUserCountryByIpAPI(ip);
        if (res.remote === "success") {
          dispatch(
            setCurrentLocation({
              countryCode: res.data.country_code2,
              countryName: res.data.country_name,
            })
          );
        }
      }
    };

    getPosition();
  }, []);

  return (
    <div className="App">
      {isGlobalLoading ? <FallbackLoading /> : ""}
      <div style={{ display: isGlobalLoading ? "none" : "" }}>
        <Header />
        <Routes>
          {ROUTES.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <>
                    <Suspense fallback={<FallbackLoading />}>
                      <route.component />
                    </Suspense>
                    <Footer />
                  </>
                }
                key={route.id}
              />
            );
          })}

          {UNAUTHENTICATED_ROUTES.map((route) => {
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <>
                    <Suspense fallback={<FallbackLoading />}>
                      <UnauthorizedRoute>
                        <route.component />
                      </UnauthorizedRoute>
                    </Suspense>
                    <Footer />
                  </>
                }
              />
            );
          })}
          {AUTHENTICATED_ROUTES.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                <Suspense fallback={<FallbackLoading />}>
                  <AuthorizedRoute>
                    <route.component />
                  </AuthorizedRoute>
                </Suspense>
              }
            />
          ))}
          <Route
            path={"/*"}
            element={
              <>
                <Layout />
              </>
            }
          />
        </Routes>

        <SuccessToast
          open={toastType === MESSAGE_TYPE.success}
          message={toastMessage}
          handleClose={() => dispatch(resetToast())}
        />
        <ErrorToast
          open={toastType === MESSAGE_TYPE.error}
          message={toastMessage}
          handleClose={() => dispatch(resetToast())}
        />
      </div>
    </div>
  );
}

export default App;
