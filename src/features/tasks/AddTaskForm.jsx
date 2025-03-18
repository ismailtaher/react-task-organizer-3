import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "./tasksSlice";

const AddTaskForm = ({ taskPriority, HEX_CODE_REGEX }) => {
  const [addNewTask, { isLoading }] = useAddNewTaskMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [color, setColor] = useState("");
  const [priority, setPriority] = useState("");
  const [colorError, setColorError] = useState("");

  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onDueDateChanged = (e) => setDueDate(e.target.value);
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
    [title, content, dueDate, color, priority].every(Boolean) &&
    HEX_CODE_REGEX.test(color) &&
    !isLoading;

  const onSaveTaskClicked = async () => {
    if (canSave) {
      try {
        await addNewTask({
          title,
          content,
          due_date: dueDate,
          task_status: "To Do",
          color,
          priority,
        }).unwrap();

        setTitle("");
        setContent("");
        setDueDate("");
        setColor("");
        setPriority("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let priorityOptions;
  priorityOptions = taskPriority.map((priority) => (
    <option key={priority.id} value={priority.id}>
      {priority.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a new task </h2>
      <form>
        <label htmlFor="taskTitle">Title:</label>
        <input
          type="text"
          name="taskTitle"
          id="taskTitle"
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

        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={onDueDateChanged}
        />

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
          Post Task
        </button>
      </form>
    </section>
  );
};

export default AddTaskForm;
