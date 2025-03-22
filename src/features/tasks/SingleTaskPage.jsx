import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTaskById } from "./tasksSlice";
import { useToggleObjectiveMutation } from "./tasksSlice";
import TaskAssignee from "./TaskAssignee";

const SingleTaskPage = ({ taskPriority, taskId }) => {
  /* const { taskId } = useParams(); */

  const [toggleObjective] = useToggleObjectiveMutation();

  const task = useSelector((state) => selectTaskById(state, taskId));

  if (!task) {
    return (
      <section>
        <h2>Task Not Found</h2>
      </section>
    );
  }

  return (
    <article className="single-task">
      <h2>{task.title}</h2>
      <p>{task.content}</p>
      <p className="bold">Key Objectives:</p>
      <form className="key-objectives">
        {Array.isArray(task?.key_objectives) &&
          task.key_objectives.map((obj, i) => (
            <div key={i}>
              <input
                type="checkbox"
                name={obj.name}
                id={`obj-${i}`}
                checked={obj.status}
                onChange={() => {
                  const updatedObj = task.key_objectives.map((o, idx) =>
                    idx === i ? { ...o, status: !o.status } : o
                  );

                  toggleObjective({
                    taskId: task.id,
                    key_objectives: updatedObj,
                  });
                }}
              />
              <label htmlFor={`obj-${i}`}> {obj.name}</label>
            </div>
          ))}
      </form>
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
      <span className="single-task-credit">
        <span className="bold">Assignee: </span>{" "}
        <TaskAssignee userId={task.userId} />
      </span>
    </article>
  );
};

export default SingleTaskPage;
