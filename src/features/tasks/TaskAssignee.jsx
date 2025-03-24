import React from "react";
import { Link } from "react-router-dom";
import { selectUserById } from "../users/usersSlice";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const TaskAssignee = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId));

  function stringToColor(string) {
    if (!string) return "#ccc"; // Default color if string is empty

    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    if (!name) return { sx: { bgcolor: "#ccc" }, children: "?" }; // Handle missing names

    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`; // Handle single-word names

    return {
      sx: {
        bgcolor: stringToColor(name), // Background color
      },
      children: initials.toUpperCase(),
    };
  }
  return (
    <span className="card-assignee">
      {author ? (
        <>
          <Avatar
            style={{ marginRight: "0.5rem" }}
            {...stringAvatar(author.name)}
            sx={{
              width: 28,
              height: 28,
              fontSize: 14,
              ...stringAvatar(author.name).sx, // Merge styles correctly
            }}
          />
          <Link to={`/user/${userId}`}>{author.name}</Link>
        </>
      ) : (
        <>
          <Avatar
            style={{ marginRight: "0.5rem" }}
            {...stringAvatar("Unknown")}
            sx={{
              width: 28,
              height: 28,
              fontSize: 14,
              ...stringAvatar("Unknown").sx,
            }}
          />
          <span>Unknown Assignee</span>
        </>
      )}
    </span>
  );
};

export default TaskAssignee;
