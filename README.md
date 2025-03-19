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
- To update the status of an objective you can use the checkboxes when you open a task (by clicking on it) `SingleTaskPage.jsx` . Also created a new mutation `toggleObjective` that does **optimistic updates** to the state of an objective, using RTK query in `tasksSlice.js`.
- The **progress bar** of a task now shows progress on the basis of how many **key_objectives** have been completed.

The progress bar of a task now shows progress on the basis of how many key_objectives have been completed.

UI updates also applied along with media queries to make it work on all screen sizes (hopefully).

![Screenshot 2025-03-18 at 8 54 50 PM](https://github.com/user-attachments/assets/6909a7d5-0a6d-46e6-a0e2-9431bb0eda7c)

![Screenshot 2025-03-18 at 8 59 20 PM](https://github.com/user-attachments/assets/d7909290-7a5e-4eb0-b9f2-7fb01012dc65)

![Screenshot 2025-03-19 at 5 05 24 PM](https://github.com/user-attachments/assets/7022de39-5121-461a-8f7c-339b41222a38)

![Screenshot 2025-03-19 at 5 05 05 PM](https://github.com/user-attachments/assets/daf21a81-dac8-46f0-8fdd-17751b967f22)

![Screenshot 2025-03-19 at 5 08 12 PM](https://github.com/user-attachments/assets/05c20a22-dda0-4fce-91b5-6aa0c95b3835)

![Screenshot 2025-03-19 at 5 10 41 PM](https://github.com/user-attachments/assets/665f97a1-fb27-4264-a002-0e3e347cfef4)

