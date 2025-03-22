import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";
import { Avatar } from "@mui/material";

const UsersList = ({ onClose }) => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");
  console.log(users);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const renderedUsers = users?.ids?.map((userId) => (
      <li key={userId} className="user-li">
        <Link
          to={`/user/${userId}`}
          className="user-link"
          onClick={() => onClose()}>
          <Avatar
            style={{ marginRight: "0.5rem" }}
            alt={users.entities[userId].name}
            sx={{
              width: 32,
              height: 32,
              bgcolor: users.entities[userId].color,
            }}>
            {users.entities[userId].name?.charAt(0)}
          </Avatar>
          {users?.entities[userId]?.name}
        </Link>
      </li>
    ));
    content = (
      <section className="user-sec">
        <h2>Users</h2>
        <ul className="user-ul">{renderedUsers}</ul>
      </section>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default UsersList;
