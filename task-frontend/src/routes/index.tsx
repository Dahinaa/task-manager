import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskPage from "../pages/TaskPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "tasks", element: <TaskPage /> },
    ],
  },
]);

export default router;