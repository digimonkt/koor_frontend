import Header from "./components/header";
import React from "react";
// import Footer from "./components/footer";
import {
  AUTHENTICATED_ROUTES,
  ROUTES,
  UNAUTHENTICATED_ROUTES,
} from "./utils/constants/routes";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
import { AuthorizedRoute, UnauthorizedRoute } from "./utils/routes";
import InnerFooter from "./components/footer/innerfooter";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

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
      {!isLoggedIn && <InnerFooter />}
    </div>
  );
}

export default App;
