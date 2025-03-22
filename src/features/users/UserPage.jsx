import { useGetUserByIdQuery } from "./usersSlice";
import { Link, useParams } from "react-router-dom";
import { useGetTasksByUserIdQuery } from "../tasks/tasksSlice";
import { selectUserById } from "./usersSlice";
import { useSelector } from "react-redux";
import TasksBoard from "../tasks/TasksBoard";

const UserPage = ({
  taskPriority,
  HEX_CODE_REGEX,
  addingTask,
  setAddingTask,
  usersList,
  setUsersList,
}) => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, userId));

  const {
    data: tasksForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = tasksForUser;

    const userTasks = ids.map((id) => {
      {
        /* <li key={id}>
        <Link to={`/task/${id}`}>{entities[id].title}</Link>
      </li> */
      }
      console.log(entities[id]);
      return entities[id];
    });
    content = userTasks.length && (
      <TasksBoard
        taskPriority={taskPriority}
        HEX_CODE_REGEX={HEX_CODE_REGEX}
        addingTask={addingTask}
        setAddingTask={setAddingTask}
        usersList={usersList}
        setUsersList={setUsersList}
        userTasks={userTasks}
        userTaskValue={true}
      />
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2 style={{ textAlign: "center", marginTop: "0" }}>{user?.name}</h2>
      <div className="user-page-div">{content}</div>
    </section>
  );
};

export default UserPage;
