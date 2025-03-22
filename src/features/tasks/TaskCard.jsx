import React from "react";
import TaskProgressBar from "./TaskProgressBar";
import TaskAssignee from "./TaskAssignee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const TaskCard = ({
  task,
  onClick,
  onEdit,
  onDelete,
  handleDragStart,
  handleDragEnd,
}) => {
  const onDragStart = (e) => {
    console.log("onDragStart");
    handleDragStart(task);
    e.dataTransfer.setData("taskId", task.id);

    // Clone the TaskCard
    const dragImage = e.currentTarget.cloneNode(true);
    document.body.appendChild(dragImage);

    // Get computed styles of the original element
    const computedStyle = window.getComputedStyle(e.currentTarget);

    // Apply width, height, padding, and margin to the clone
    dragImage.style.width = computedStyle.width;
    dragImage.style.height = computedStyle.height;
    dragImage.style.padding = computedStyle.padding;
    dragImage.style.margin = computedStyle.margin;

    // Keep it hidden from the actual DOM layout
    dragImage.style.position = "absolute";
    dragImage.style.top = "-999px";
    dragImage.style.left = "-999px";

    // Set the cloned element as the drag image
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Remove the cloned element after the drag starts
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  // Define progress percentage based on task status

  return (
    <article
      className="task"
      draggable
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      style={{ borderLeft: `10px solid ${task.color}` }}>
      <h3>{task.title}</h3>

      <p>{task.content.substring(0, 70)}...</p>
      <TaskProgressBar task={task} />
      <div className="card-buttons">
        <button
          className="button"
          aria-label="Edit task"
          title="Edit Task"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          className="button deleteButton"
          aria-label="Delete Task"
          title="Delete Task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <TaskAssignee userId={task.userId} />
      </div>
    </article>
  );
};

export default TaskCard;
