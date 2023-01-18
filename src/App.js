import Header from "src/components/header";
import React from "react";
import Footer from "src/components/footer";
import { ROUTES } from "src/utils/constants/route";
import { Route, Routes } from "react-router-dom";
import Layout from "src/components/layout";
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
