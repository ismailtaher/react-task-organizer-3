import React from "react";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";

import { useParams, Link } from "react-router-dom";

const SingleTaskPage = ({ taskPriority, taskId }) => {
  /* const { taskId } = useParams(); */
  const task = useSelector((state) => selectTaskById(state, taskId));

  if (!task) {
    return (
      <section>
        <h2>Task Not Found</h2>
      </section>
    );
  }

  console.log(task);
  return (
    <article className="single-task">
      <h2>{task.title}</h2>
      <p>{task.content}</p>
      <p>
        <span className="bold">Status:</span> {task.task_status}
      </p>
      <p>
        <span className="bold">Priority:</span>{" "}
        {taskPriority.find((prior) => prior.id === task.priority)?.name ||
          "unknown"}
      </p>
      <p>
        <span className="bold">Due Date:</span> {task.due_date}
      </p>
    </article>
  );
};

export default SingleTaskPage;
