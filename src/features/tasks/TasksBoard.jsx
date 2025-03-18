import React, { useState } from "react";
import Modal from "./Modal";
import SingleTaskPage from "./SingleTaskPage";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./tasksSlice";
import TasksContainer from "./TasksContainer";
import { useGetTasksQuery } from "./tasksSlice";

const TasksBoard = ({ taskPriority }) => {
  const { isLoading, isSuccess, isError, error } = useGetTasksQuery();

  const tasks = useSelector(selectAllTasks);

  const [selectedTask, setSelectedTask] = useState(null);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    /* content = orderedTaskIds.map((taskId) => (
      <TasksContainer key={taskId} taskId={taskId} />
    )); */
    content = [
      { name: "To Do", color: "#FFCDB2" },
      { name: "In Progress", color: "#FFB4A2" },
      { name: "In Review", color: "#E5989B" },
      { name: "Done", color: "#B5838D" },
    ].map((task_status) => (
      <TasksContainer
        key={task_status.name}
        task_status={task_status.name}
        color={task_status.color}
        tasks={tasks}
        onTaskClick={setSelectedTask}
      />
    ));
  } else if (isError) {
    content = <p>{error?.message || "Error loading tasks"}</p>;
  }

  return (
    <section className="task-board">
      {content}
      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
        {selectedTask && (
          <SingleTaskPage
            taskPriority={taskPriority}
            taskId={selectedTask.id}
          />
        )}
      </Modal>
    </section>
  );
};

export default TasksBoard;
