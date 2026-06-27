import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskPage from "../pages/TaskPage";
import TaskFormPage from "../pages/TaskFormPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "tasks", element: <TaskPage /> },
      { path: "tasks/new", element: <TaskFormPage /> },
      { path: "tasks/:id/edit", element: <TaskFormPage /> },
    ],
  },
]);

export default router;