import React from "react";

const TaskProgressBar = ({ task }) => {
  if (!task || !task.key_objectives) return null;

  const totalObjectives = task.key_objectives.length;
  const completedObjectives = task.key_objectives.filter(
    (obj) => obj.status === true
  ).length;
  const progress =
    totalObjectives > 0 ? (completedObjectives / totalObjectives) * 100 : 0;

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
