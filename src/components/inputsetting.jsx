import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function inputsetting() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const pf = "https://api-blog-mquf.onrender.com/images/";
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [updata, setUpdate] = useState(false);
  const [repass, setRepass] = useState(false);
  const [updatedata, setUpdatedata] = useState("");

  const userid = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(
        `https://api-blog-mquf.onrender.com/getuser/${userid._id}`
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
        await axios.post("https://api-blog-mquf.onrender.com/upload", data);
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
          `https://api-blog-mquf.onrender.com/user/${userid._id}`,
          dataset
        );
        setUserInfo(dataset);
        localStorage.setItem("user", JSON.stringify(dataset));
        toast.success(res.data.msg);
        setUpdate(false);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      try {
        const res = await axios.put(
          `https://api-blog-mquf.onrender.com/user/${userid._id}`,
          dataset
        );
        setUserInfo(dataset);
        localStorage.setItem("user", JSON.stringify(dataset));
        toast.success(res.data.msg);
        setUpdatedata(dataset);
        setUpdate(false);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        "https://api-blog-mquf.onrender.com/delete/" + userid._id
      );
      localStorage.removeItem("user");
      setUserInfo(null);
      toast.success(res.data.msg);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl my-10">MyProfile</h1>
      <div className="flex flex-col gap-5 px-10 md:px-36 lg:px-80 ">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : pf + userid.profilePic || pf + updatedata.profilePic
            }
            alt=""
            className="w-28 h-28 lg:h-48 lg:w-48 rounded-full"
          />
          <div className="flex gap-1 ">
            <i
              onClick={() => setUpdate(!updata)}
              className="bx bx-edit text-teal-700 hover:-translate-y-1 duration-500 cursor-pointer"
            ></i>
            <i
              onClick={handleDelete}
              className="bx bx-x-circle text-red-600 hover:-translate-y-1 duration-500 cursor-pointer"
            ></i>
          </div>
        </div>
        {updata && (
          <div>
            <label htmlFor="fileInput">
              <i className="bx bx-image-add text-5xl cursor-pointer"></i>
            </label>
            <input
              className="hidden"
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          disabled={!updata ? true : false}
          placeholder="Email"
          className="outline-none border border-gray-400 rounded-md px-3 md:h-8"
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          disabled={!updata ? true : false}
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

export default inputsetting;
