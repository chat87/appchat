import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import BaseLayout from "../views/BaseLayout";
import RegisterPage from "../views/RegisterPage";
import HomePage from "../views/HomePage";

const url = "http://localhost:3000";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
  },
  {
    path: "/register",
    element: <RegisterPage url={url} />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
