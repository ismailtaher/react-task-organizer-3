import TasksBoard from "./features/tasks/TasksBoard";
import Layout from "./components/Layout";
import AddTaskForm from "./features/tasks/AddTaskForm";
import SingleTaskPage from "./features/tasks/SingleTaskPage";
import EditTaskForm from "./features/tasks/EditTaskForm";
import { Routes, Route, Navigate } from "react-router-dom";

const HEX_CODE_REGEX = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

function App() {
  const taskPriority = [
    { name: "Low", id: "1" },
    { name: "Medium", id: "2" },
    { name: "High", id: "3" },
    { name: "Extreme", id: "4" },
  ];
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksBoard taskPriority={taskPriority} />} />

        <Route path="task">
          <Route
            index
            element={
              <AddTaskForm
                taskPriority={taskPriority}
                HEX_CODE_REGEX={HEX_CODE_REGEX}
              />
            }
          />
          <Route
            path=":taskId"
            element={
              <SingleTaskPage
                taskPriority={taskPriority}
                HEX_CODE_REGEX={HEX_CODE_REGEX}
              />
            }
          />
          <Route
            path="edit/:taskId"
            element={
              <EditTaskForm
                taskPriority={taskPriority}
                HEX_CODE_REGEX={HEX_CODE_REGEX}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
