import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Modal from "../features/tasks/Modal";
import UsersList from "../features/users/UsersList";

const Layout = ({ setAddingTask, setUsersList }) => {
  return (
    <div className="layout">
      <Header setAddingTask={setAddingTask} setUsersList={setUsersList} />
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
