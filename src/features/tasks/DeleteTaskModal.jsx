import React from "react";
import { useDeleteTaskMutation } from "./tasksSlice";

const DeleteTaskModal = ({ task, onClose }) => {
  const [deleteTask] = useDeleteTaskMutation();
  console.log(task);
  const onDeleteTaskClicked = async () => {
    // delete task functionality
    try {
      await deleteTask({ id: task.id }).unwrap();

      onClose();
    } catch (err) {
      console.error("Failed to delete the Task", err);
    }
  };

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete task: "{task.title}" permanently?</h3>
      <div className="modal-buttons">
        <button className="confirm-button" onClick={onDeleteTaskClicked}>
          Confirm
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
