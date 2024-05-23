import {createBrowserRouter, redirect} from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import HomePage from "../views/HomePage";
import Swal from "sweetalert2";
import {io} from "socket.io-client";
import LandingPage from "../views/LandingPage";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.token) {
        Swal.fire({
          icon: "error",
          title: `You already logged in`,
        });
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.token) {
        Swal.fire({
          icon: "error",
          title: `You already logged in`,
        });
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/homePage",
    element: <HomePage socket={socket} />,
    loader: () => {
      if (!localStorage.token) {
        Swal.fire({
          icon: "error",
          title: "first login",
        });
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
