import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ setAddingTask }) => {
  return (
    <div className="layout">
      <Header setAddingTask={setAddingTask} />
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
