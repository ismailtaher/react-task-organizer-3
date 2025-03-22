import React from "react";
import { Link } from "react-router-dom";

const Header = ({ setAddingTask, setUsersList }) => {
  return (
    <header className="header">
      <h1>Task Organizer</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="li-but">
            <button
              onClick={() => {
                setUsersList({ open: true });
              }}>
              Users
            </button>
            {/* <Link to="/user">Users</Link> */}
          </li>
          <li>
            <button onClick={() => setAddingTask(true)}>Create Task</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
