import Header from "./components/header";
import React from "react";
import Footer from "./components/footer";
import { ROUTES } from "./utils/constants/routes";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { useSelector } from "react-redux";

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
