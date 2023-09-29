import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Setting() {
  const notify = () => toast();
  const pf = "http://localhost:5000/images/";
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [updata, setUpdate] = useState(false);
  const [repass, setRepass] = useState(false);

  const userid = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(
        `http://localhost:5000/getuser/${userid._id}`
      );
      setUsername(res.data.username);
      setEmail(res.data.email);
    };
    fetchuser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataset = {
      _id: userid._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      dataset.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (err) {
        console.log("Cant Upload");
      }
    } else {
      dataset.profilePic = userid.profilePic;
    }
    if (newpassword) {
      dataset.resetpassword = newpassword;
      try {
        const res = await axios.put(
          `http://localhost:5000/user/${userid._id}`,
          dataset
        );
        localStorage.setItem("currentUser", JSON.stringify(dataset));
        toast.success(res.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      try {
        const res = await axios.put(
          `http://localhost:5000/user/${userid._id}`,
          dataset
        );
        localStorage.setItem("currentUser", JSON.stringify(dataset));
        toast.success(res.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="mt-40 bg-white shadow-gray-500 shadow-2xl h-[600px] max-w-6xl mx-auto flex flex-col justify-center rounded-3xl">
      <h1 className="text-center text-3xl">MyProfile</h1>
      <div className="flex flex-col gap-5 px-5">
        <div className="w-28 lg:w-48">
          <img
            src={file ? URL.createObjectURL(file) : pf + userid.profilePic}
            alt=""
            className="w-28 h-28 lg:h-48 lg:w-48 rounded-full"
          />
          <div className="flex gap-1 justify-end items-center">
            <i
              onClick={() => setUpdate(!updata)}
              className="bx bx-edit text-teal-700 hover:-translate-y-1 duration-500 cursor-pointer"
            ></i>
            <i className="bx bx-x-circle text-red-600 hover:-translate-y-1 duration-500 cursor-pointer"></i>
          </div>
        </div>
        {updata && (
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
          className="outline-none border border-gray-400 rounded-md px-3 md:h-8"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
          className="outline-none border border-gray-400 rounded-md px-3 md:h-8"
        />
        {updata && (
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder={
              !repass
                ? "Please enter a password again to update"
                : "Old Password"
            }
            className="outline-none border border-gray-400 rounded-md px-3 md:h-8"
          />
        )}
        {repass && (
          <input
            onChange={(e) => setnewPassword(e.target.value)}
            type="text"
            placeholder="New Password"
            className="outline-none border border-gray-400 rounded-md px-3 md:h-8"
          />
        )}
        {updata && (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-zinc-700 text-white w-32  py-1 rounded-xl hover:-translate-y-1 hover:bg-stone-800 duration-500"
            >
              Update
            </button>
            <button
              onClick={() => setRepass(!repass)}
              className="bg-zinc-700 text-white w-36  py-1 rounded-xl hover:-translate-y-1 hover:bg-stone-800 duration-500"
            >
              ResetPassword
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Setting;
