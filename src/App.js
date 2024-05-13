import Header from "./components/header";
import React, { Suspense, useEffect } from "react";
import {
  AUTHENTICATED_ROUTES,
  ROUTES,
  UNAUTHENTICATED_ROUTES,
} from "./utils/constants/routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layout";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizedRoute, UnauthorizedRoute } from "./utils/routes";
import { globalLocalStorage } from "./utils/localStorage";
import {
  getUserDetails,
  setCurrentLocation,
  setIsLoggedIn,
  setUserVerificationToken,
} from "./redux/slice/user";
import { ErrorToast, SuccessToast } from "./components/toast";
import { MESSAGE_TYPE, USER_ROLES } from "./utils/enum";
import { resetToast } from "./redux/slice/toast";
import { FallbackLoading } from "./components/loader/fallbackLoader";
import { firebaseInitialize } from "./firebaseProvider";
import { getUserCountryByIpAPI, getUserIpAPI, postUserIpAPI } from "./api/user";
import InnerFooter from "./components/footer/innerfooter";
import { Capacitor } from "@capacitor/core";
import BottomBar from "@components/layout/bottom-navigation";
import { setIsMobileView } from "@redux/slice/platform";
import { App as CapApp } from "@capacitor/app";
import { useScrollTop } from "@hooks/";
import {
  deepLinked,
  backButtonAction,
  fetchAppInfo,
  safeAreaSetter,
} from "@utils/appUtils";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    auth: { isGlobalLoading, currentUser },
    toast: { message: toastMessage, type: toastType },
  } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { appInfo, isMobileView } = useSelector(({ platform }) => platform);

  const checkLoginStatus = () => {
    const accessToken = globalLocalStorage.getAccessToken();
    const refreshToken = globalLocalStorage.getRefreshToken();
    if (accessToken && refreshToken && !currentUser.id) {
      dispatch(getUserDetails());
    } else if (!accessToken || !refreshToken) {
      dispatch(setIsLoggedIn(false));
    }
  };

  const getAPI = async () => {
    const userIp = await getUserIpAPI();
    if (userIp.remote === "success") {
      const ip = userIp.data.ip;
      await postUserIpAPI(ip);
    }
  };

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

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      fetchAppInfo(dispatch);
      safeAreaSetter(dispatch);
      dispatch(setIsMobileView(true));
      const appUrlOpenListener = (data) => {
        deepLinked(navigate, data.url);
      };
      CapApp.addListener("appUrlOpen", appUrlOpenListener);
      window.addEventListener("storage", checkLoginStatus);
      if (Capacitor.isNativePlatform()) {
        CapApp.addListener("backButton", backButtonAction);
      }
      checkLoginStatus();
      return () => {
        CapApp.removeAllListeners("appUrlOpen", appUrlOpenListener);
      };
    } else {
      dispatch(setIsMobileView(false));
    }
  }, [isMobileView, appInfo.name]);
  useEffect(() => {
    if (currentUser.role !== USER_ROLES.employer) {
      const isVerified = currentUser?.profile?.isVerified;
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split("?");
      if (urlParts.length === 2) {
        const queryParams = urlParts[1];
        const paramPairs = queryParams.split("&");
        const verifyTokenPair = paramPairs.find((pair) =>
          pair.startsWith("verify-token=")
        );
        if (verifyTokenPair) {
          const verifyToken = verifyTokenPair.split("=")[1];
          dispatch(setUserVerificationToken(verifyToken));
        }
      }
      if (currentUser?.id && !isVerified) {
        navigate("/account-verification");
      }
    }
  }, [currentUser?.id, window.location.pathname]);
  useEffect(() => {
    getPosition();
    getAPI();
    firebaseInitialize();
  }, []);
  useScrollTop();
  return (
    <div className="App">
      {isGlobalLoading ? <FallbackLoading /> : ""}
      <div style={{ display: isGlobalLoading ? "none" : "" }}>
        {isMobileView ? null : <Header />}
        <Routes>
          {ROUTES.map((route) => {
            if (!route.path) {
              return null;
            }
            return (
              <Route
                path={route.path}
                element={
                  <>
                    <Suspense fallback={<FallbackLoading />}>
                      <route.component />
                    </Suspense>
                    <InnerFooter />
                    {/* <Footer /> */}
                  </>
                }
                key={route.id}
              />
            );
          })}
          {UNAUTHENTICATED_ROUTES.map((route) => {
            if (!route.path) {
              return null;
            }
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
                      <></>
                    </Suspense>
                    {/* <Footer /> */}
                    {isMobileView ? null : <InnerFooter />}
                  </>
                }
              />
            );
          })}
          {AUTHENTICATED_ROUTES.map((route) => {
            if (!route.path) {
              return null;
            }
            return (
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
            );
          })}
          <Route
            path={"/*"}
            element={
              <>
                <Layout />
              </>
            }
          />
        </Routes>
        {isLoggedIn && isMobileView && <BottomBar />}
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
