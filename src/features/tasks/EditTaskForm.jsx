import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTasksQuery, useUpdateTaskMutation } from "./tasksSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useSelector } from "react-redux";

const EditTaskForm = ({ HEX_CODE_REGEX, taskPriority, taskId, onClose }) => {
  /* const { taskId } = useParams(); */
  const navigate = useNavigate();

  // update task & delete task mutations
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  /* const [deleteTask] = useDeleteTaskMutation(); */

  const {
    task,
    isLoading: isLoadingTasks,
    isSuccess,
  } = useGetTasksQuery("getTasks", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      task: data?.entities[taskId],
      isLoading,
      isSuccess,
    }),
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [keyObjectives, setKeyObjectives] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [priority, setPriority] = useState("");
  const [colorError, setColorError] = useState("");

  const users = useSelector((state) => selectAllUsers(state));

  useEffect(() => {
    if (isSuccess && task) {
      setTitle(task.title || "");
      setContent(task.content || "");
      setUserId(task.userId || "");
      setDueDate(
        task.due_date ? new Date(task.due_date).toISOString().split("T")[0] : ""
      );
      setStatus(task.task_status || "");
      setColor(task.color || "");
      setPriority(task.priority || "");
      setKeyObjectives(task.key_objectives ? task.key_objectives : []);
    }
  }, [
    task,
    isSuccess,
    task?.title,
    task?.content,
    task?.userId,
    task?.due_date,
    task?.task_status,
    task?.color,
    task?.priority,
    task?.key_objectives,
  ]);

  if (isLoadingTasks) return <p>Loading</p>;

  if (!task) {
    return (
      <section>
        <h2>Task not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAssigneeChanged = (e) => setUserId(e.target.value);
  const onObjectiveChanged = (index, newName) => {
    setKeyObjectives((prev) =>
      prev.map((obj, i) => (i === index ? { ...obj, name: newName } : obj))
    );
  };
  /* const onObjectiveStatusChanged = (index) => {
    setKeyObjectives((prev) =>
      prev.map((obj, i) =>
        i === index ? { ...obj, status: !obj.status } : obj
      )
    );
  }; */
  const onDueDateChanged = (e) => setDueDate(e.target.value);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onColorChanged = (e) => {
    const value = e.target.value;
    setColor(value);
    if (!HEX_CODE_REGEX.test(value)) {
      setColorError("Invalid hex color code");
    } else {
      setColorError("");
    }
  };
  const onPriorityChanged = (e) => setPriority(e.target.value);

  const canSave =
    [title, content, userId, dueDate, status, color, priority].every(Boolean) &&
    HEX_CODE_REGEX.test(color) &&
    !isLoading;

  const onSaveTaskClicked = async () => {
    //save task functionality
    if (canSave) {
      try {
        await updateTask({
          id: task.id,
          title,
          content,
          userId,
          due_date: dueDate,
          task_status: status,
          color,
          priority,
          key_objectives: keyObjectives,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        setDueDate("");
        setStatus("");
        setColor("");
        setPriority("");
        setKeyObjectives([]);
        onClose();
      } catch (err) {
        console.error("Failed to save the Task", err);
      }
    }
  };

  let priorityOptions;
  priorityOptions = taskPriority.map((priority) => (
    <option key={priority.id} value={priority.id}>
      {priority.name}
    </option>
  ));

  let userOptions;
  userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));
  /* const onDeleteTaskClicked = async () => {
    // delete task functionality
    try {
      await deleteTask({ id: task?.id }).unwrap();

      setTitle("");
      setContent("");
      setDueDate("");
      setStatus("");
      setColor("");
      setPriority("");
      onClose();
    } catch (err) {
      console.error("Failed to delete the Task", err);
    }
  }; */

  const addNewObjective = () => {
    setKeyObjectives((prev) => [...prev, { name: "", status: false }]);
  };

  const removeObjective = (index) => {
    setKeyObjectives((prev) => prev.filter((objRemoved, i) => i !== index));
  };

  return (
    <section className="edit-task">
      <h2>Edit Task</h2>
      <form>
        <label htmlFor="taskTitle">Title:</label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="taskContent">Content:</label>
        <textarea
          name="taskContent"
          id="taskContent"
          value={content}
          onChange={onContentChanged}
        />

        <label htmlFor="assignee">Assignee:</label>
        <select id="assignee" value={userId} onChange={onAssigneeChanged}>
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="keyObjectives">Key Objectives:</label>
        {keyObjectives.map((obj, i) => (
          <div key={i}>
            <input
              type="text"
              value={obj.name}
              onChange={(e) => onObjectiveChanged(i, e.target.value)}
            />
            <button
              type="button"
              title="Remove"
              className="times-obj"
              onClick={() => removeObjective(i)}>
              &times;
            </button>
          </div>
        ))}
        <button type="button" className="button" onClick={addNewObjective}>
          Add Objective
        </button>

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={onDueDateChanged}
        />

        <label htmlFor="taskStatus">Status:</label>
        <select
          name="taskStatus"
          id="taskStatus"
          value={status}
          onChange={onStatusChanged}>
          {["To Do", "In Progress", "In Review", "Done"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <label htmlFor="color">Color:</label>
        <input type="text" id="color" value={color} onChange={onColorChanged} />
        {colorError && (
          <p style={{ color: "red", marginTop: "0" }}>{colorError}</p>
        )}

        <label htmlFor="priority">Priority:</label>
        <select id="priority" value={priority} onChange={onPriorityChanged}>
          <option value=""></option>
          {priorityOptions}
        </select>

        <button
          className="button"
          type="button"
          onClick={onSaveTaskClicked}
          disabled={!canSave}>
          Save Task
        </button>

        {/* <button
          className="button deleteButton"
          type="button"
          onClick={onDeleteTaskClicked}>
          Delete task
        </button> */}
      </form>
    </section>
  );
};

export default EditTaskForm;
