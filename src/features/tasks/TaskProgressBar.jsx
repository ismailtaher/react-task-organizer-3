import React from "react";

const TaskProgressBar = ({ task }) => {
  const progressMap = {
    "To Do": 25,
    "In Progress": 50,
    "In Review": 75,
    Done: 100,
  };

  const progress = progressMap[task.task_status] || 0; // Default to 0 if undefined
  return (
    <div style={{ marginTop: "10px", width: "100%" }}>
      <div
        style={{
          height: "8px",
          width: "100%",
          background: "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: progress === 100 ? "#4caf50" : "#2196F3",
            transition: "width 0.3s ease-in-out",
          }}></div>
      </div>
    </div>
  );
};

export default TaskProgressBar;
