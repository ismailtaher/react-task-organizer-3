import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
