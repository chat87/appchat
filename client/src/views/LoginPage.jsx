
import Swal from "sweetalert2";
import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      let { data } = await axios.post(`http://localhost:3000/login`, { userName, password });
      localStorage.setItem("token", data.access_token);
      navigate('/')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.response.data.message
      })
    }
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
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
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
