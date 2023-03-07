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
import { getUserDetails, setIsLoggedIn } from "@redux/slice/user";
import { ErrorToast, SuccessToast } from "@components/toast";
import { MESSAGE_TYPE } from "@utils/enum";
import { resetToast } from "@redux/slice/toast";
import { FallbackLoading } from "@components/loader/fallbackLoader";

function App() {
  const dispatch = useDispatch();
  const {
    auth: { isLoggedIn },
    toast: { message: toastMessage, type: toastType },
  } = useSelector((state) => state);
  const checkLoginStatus = () => {
    const accessToken = globalLocalStorage.getAccessToken();
    const refreshToken = globalLocalStorage.getRefreshToken();
    if (accessToken && refreshToken) {
      dispatch(getUserDetails());
    } else {
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

  return (
    <div className="App">
      <Header />
      <Routes>
        {ROUTES.map((route) => {
          return (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<FallbackLoading />}>
                  <route.component />
                </Suspense>
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
                <Suspense fallback={<FallbackLoading />}>
                  <UnauthorizedRoute>
                    <route.component />
                  </UnauthorizedRoute>
                </Suspense>
              }
            />
          );
        })}
        {AUTHENTICATED_ROUTES.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <AuthorizedRoute>
                <route.component />
              </AuthorizedRoute>
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
      {!isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
