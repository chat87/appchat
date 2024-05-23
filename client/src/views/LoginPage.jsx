import Swal from "sweetalert2";
import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {IoArrowBackCircle} from "react-icons/io5";
export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      let {data} = await axios.post(`http://localhost:3000/login`, {
        userName,
        password,
      });
      localStorage.setItem("token", data.access_token);
      navigate("/homePage");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-black">
              Login now!
            </h1>
            <p className="py-6">
              ChatSync, where people come to get connected. Engage in lively
              chat with friends.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <form className="card-body">
              <IoArrowBackCircle
                className="w-6 h-6 outline-none cursor-pointer w-6 h-6 outline-none cursor-pointer text-white bg-teal-700 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300"
                onClick={() => navigate("/")}
              />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label m-auto">
                  <p>
                    Don&apos;t have an account yet? &nbsp;
                    <span
                      onClick={() => navigate("/register")}
                      className="link link-primary"
                    >
                      Create an account
                    </span>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
