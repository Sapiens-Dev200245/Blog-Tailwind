import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      navigate("/login");
      toast.success("Register Success");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg); // เข้าถึงข้อความ msg ใน error.response.data
      } else {
        toast.error("Network Error");
      }
    }
  };

  console.log({ username, email, password });
  return (
    <div className="max-w-xl mx-auto mt-40 px-3">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl text-center">Register</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="outline-none border border-gray-500  rounded-full h-8 px-5"
        />
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
          onClick={handleRegister}
          className="bg-gray-700 text-white py-1 w-32 rounded-md hover:-translate-y-1 hover:bg-gray-950 duration-500 ease-in-out"
        >
          Sign Up
        </button>
        <p>
          Have alreary account{" "}
          <a
            href="/login"
            className="hover:-translate-y-1 hover:text-amber-500 duration-500"
          >
            Click!!!
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
