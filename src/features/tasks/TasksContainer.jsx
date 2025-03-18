import React from "react";
import TaskCard from "./TaskCard";
import { useOnDragTaskMutation } from "./tasksSlice";

const TasksContainer = ({ task_status, color, tasks, onTaskClick }) => {
  const [onDragTask] = useOnDragTaskMutation();

  const onDrop = async (e) => {
    console.log("onDrop");
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    console.log("TaskID from drag Event:", taskId);

    if (!taskId) {
      console.error("No taskId");
      return;
    }

    //Finding task to update
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      console.error(`task with ID ${taskId} not found in the tasks state.`);
      return;
    }

    const updatedTask = { ...taskToUpdate, task_status };
    console.log(updatedTask);

    try {
      await onDragTask(updatedTask).unwrap();
    } catch (err) {
      console.error("Failed to update task");
    }
  };

  return (
    <section
      className="task-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}>
      <div className="task-heading" style={{ backgroundColor: `${color}` }}>
        <h2>{task_status}</h2>
      </div>
      <section className="task-sec">
        {tasks
          .filter((task) => task.task_status === task_status)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
      </section>
    </section>
  );
};

export default TasksContainer;
