# react-task-organizer

Built to organize your tasks according to what needs to be done first.

## json-server

The app is using json-server in order to mimic a backend.
To start the json-server:

### `json-server -w data/db.json -p 3500`

## Brief Introduction

The app uses **Drag & Drop API** from HTML 5. You can drag & drop a task from one status to another. The app is built using **Vite**. **Redux Toolkit** is being used for state management. API calls are made using **RTK Query**. Used **react-router-dom** for easy routing.

All the **CRUD operations** along with Drag and Drop updates are being handled inside `tasksSlice.js`.
Also the tasks are now sorted on the basis of their **priority** (low, medium, high & extreme). Each tasks can be viewed separately in the the **Modal** containing `SingleTaskPage.jsx` , which gives the details about that specific task. You can **Edit or Delete** a task using the buttons provided on each task's card.

Each container now has limitations to what task it can accept or not depending on that task's status. A green outline will appear over certain containers to signify if they can accept that task or not.

- Added `key_objectives` attribute in each task. Now each task can have it’s own set of objectives to be completed.
- These objectives can be added/removed when Creating a Task `AddTaskForm.jsx` and Updating a Task `EditTaskForm.jsx`.
- To update the status of an objective you can use the checkboxes when you open a task (by clicking on it) `SingleTaskPage.jsx` . Also created a new mutation `toggleObjective` that does **optimistic updates** to the state of that objective's Task, using RTK query in `tasksSlice.js`.
- The **progress bar** of a task now shows progress on the basis of how many **key_objectives** have been completed.

The progress bar of a task now shows progress on the basis of how many key_objectives have been completed.

UI updates also applied along with media queries to make it work on all screen sizes (hopefully).

### (users-edtion) (now merged with main):
- Added users endpoint to `data/db.json`.
- Added `userId` attribute to each task in order to assign users with their respective tasks.
- `TaskCard.jsx` & `SingleTaskPage.jsx` now also display the username & avatar of the assignee user.
- Created users' Avatar using **MUI's Avatar** component in `TaskAssignee.jsx` which uses a Users' initials to create their Avatar.
- Added a `UserList.jsx` component gives a list of all users displayed in a modal.
- When a **user is clicked** you are routed to `UserPage.jsx` where all the tasks assigned to that specific user are displayed in the `TaskBoard.jsx` component.
- A task can be assigned to any user when creating a task in `AddTaskForm.jsx` or when updating a task `EditTaskForm.jsx`.

## Screenshots:

### Main Page:

<img width="1437" alt="Screenshot 2025-03-24 at 3 47 22 PM" src="https://github.com/user-attachments/assets/bb3f2407-0710-43cc-94e6-3a69fa97f22e" />

### Dragging a task:

<img width="1437" alt="Screenshot 2025-03-24 at 3 47 46 PM" src="https://github.com/user-attachments/assets/a60c3726-997e-4123-9813-2587ed0ef03d" />

### SingleTaskPage:

<img width="1437" alt="Screenshot 2025-03-24 at 3 48 13 PM" src="https://github.com/user-attachments/assets/440873e9-bb7d-4822-93a8-8c8885485dfd" />

### UsersList:

<img width="1437" alt="Screenshot 2025-03-24 at 3 48 23 PM" src="https://github.com/user-attachments/assets/f6cf6544-1040-4eec-a5af-faa114c1b2a1" />

### UserPage:

<img width="1437" alt="Screenshot 2025-03-24 at 3 48 34 PM" src="https://github.com/user-attachments/assets/da345a55-119d-4263-a962-07ba888bd92c" />

### AddTaskForm:

<img width="1437" alt="Screenshot 2025-03-24 at 3 48 47 PM" src="https://github.com/user-attachments/assets/23ef76ea-7beb-4569-90b8-2bc78c7a349e" />

### EditTaskForm:

<img width="1437" alt="Screenshot 2025-03-24 at 3 48 57 PM" src="https://github.com/user-attachments/assets/20a9559f-9b51-4ac8-857b-32afdf152b96" />

### Delete Task Confirmation:

<img width="1437" alt="Screenshot 2025-03-24 at 3 49 04 PM" src="https://github.com/user-attachments/assets/c4ca3f52-a5d5-47b8-b815-1380a67d29ea" />
