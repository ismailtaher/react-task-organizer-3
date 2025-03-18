import React, { useState } from "react";
import Modal from "./Modal";
import SingleTaskPage from "./SingleTaskPage";
import EditTaskForm from "./EditTaskForm";
import AddTaskForm from "./AddTaskForm";
import DeleteTaskModal from "./DeleteTaskModal";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./tasksSlice";
import TasksContainer from "./TasksContainer";
import { useGetTasksQuery } from "./tasksSlice";

const TasksBoard = ({
  taskPriority,
  HEX_CODE_REGEX,
  addingTask,
  setAddingTask,
}) => {
  const { isLoading, isSuccess, isError, error } = useGetTasksQuery();

  const tasks = useSelector(selectAllTasks);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

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
        onEditTaskClick={setEditingTask}
        onDeleteTaskClick={setDeletingTask}
      />
    ));
  } else if (isError) {
    content = <p>{error?.message || "Error loading tasks"}</p>;
  }

  return (
    <section className="task-board">
      {content}

      {/* View Task Modal */}
      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
        {selectedTask && (
          <SingleTaskPage
            taskPriority={taskPriority}
            taskId={selectedTask.id}
          />
        )}
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
        {editingTask && (
          <EditTaskForm
            HEX_CODE_REGEX={HEX_CODE_REGEX}
            taskPriority={taskPriority}
            taskId={editingTask.id}
            onClose={() => setEditingTask(null)}
          />
        )}
      </Modal>

      {/* Add Task Modal */}
      <Modal isOpen={!!addingTask} onClose={() => setAddingTask(null)}>
        {addingTask && (
          <AddTaskForm
            HEX_CODE_REGEX={HEX_CODE_REGEX}
            taskPriority={taskPriority}
            onClose={() => setAddingTask(null)}
          />
        )}
      </Modal>

      {/* Delete Task Modal */}
      <Modal isOpen={!!deletingTask} onClose={() => setDeletingTask(null)}>
        {deletingTask && (
          <DeleteTaskModal
            task={deletingTask}
            onClose={() => setDeletingTask(null)}
          />
        )}
      </Modal>
    </section>
  );
};

export default TasksBoard;
