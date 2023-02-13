import Header from "./components/header";
import React, { useEffect } from "react";
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

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    const accessToken = globalLocalStorage.getAccessToken();
    if (accessToken) {
      dispatch(setIsLoggedIn(true));
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserDetails());
    }
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Header />
      <Routes>
        {ROUTES.map((route) => {
          return (
            <Route
              path={route.path}
              element={<route.component />}
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
                <UnauthorizedRoute>
                  <route.component />
                </UnauthorizedRoute>
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
      {!isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
