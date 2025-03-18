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

A progress bar is shown below the task in the TaskCard component (right now the progress bar depends on the task’s status e.g. if a task’s status is “To Do”, the progress bar would show 25% and if the task’s status is “In Review”, the progress bar would show 75%).

UI updates also applied along with media queries to make it work on all screen sizes (hopefully).

![Screenshot 2025-03-18 at 8 54 50 PM](https://github.com/user-attachments/assets/6909a7d5-0a6d-46e6-a0e2-9431bb0eda7c)

![Screenshot 2025-03-18 at 8 59 20 PM](https://github.com/user-attachments/assets/d7909290-7a5e-4eb0-b9f2-7fb01012dc65)

![Screenshot 2025-03-18 at 8 58 13 PM](https://github.com/user-attachments/assets/b41f329e-f52c-4729-b3a3-743a8aa75e2b)

![Screenshot 2025-03-18 at 8 58 23 PM](https://github.com/user-attachments/assets/6984ec00-8f18-4c44-a9d9-86d668e092ea)

![Screenshot 2025-03-18 at 8 58 31 PM](https://github.com/user-attachments/assets/7caaa5a8-4200-4b2b-8024-2ba30c70bdeb)






