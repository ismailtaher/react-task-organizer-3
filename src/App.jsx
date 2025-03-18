import TasksBoard from "./features/tasks/TasksBoard";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

const HEX_CODE_REGEX = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

function App() {
  const taskPriority = [
    { name: "Low", id: "1" },
    { name: "Medium", id: "2" },
    { name: "High", id: "3" },
    { name: "Extreme", id: "4" },
  ];

  const [addingTask, setAddingTask] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Layout setAddingTask={setAddingTask} />}>
        <Route
          index
          element={
            <TasksBoard
              taskPriority={taskPriority}
              HEX_CODE_REGEX={HEX_CODE_REGEX}
              addingTask={addingTask}
              setAddingTask={setAddingTask}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
