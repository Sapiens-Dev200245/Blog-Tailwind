import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!username || !password) {
      return toast.error("Please enter your email and password");
    }
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUserInfo(res.data);
      console.log(setUserInfo);
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-40 px-3">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl text-center">Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="outline-none border border-gray-500 rounded-full h-8 px-5"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="outline-none border border-gray-500 rounded-full h-8 px-5"
        />
        <button
          onClick={handleLogin}
          className="bg-gray-700 text-white py-1 w-32 rounded-md hover:-translate-y-1 hover:bg-gray-950 duration-500 ease-in-out"
        >
          Sign In
        </button>
        <p>
          Not a member{" "}
          <Link
            to="/register"
            className="hover:-translate-y-1 hover:text-amber-500 duration-500"
          >
            Click!!!
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
