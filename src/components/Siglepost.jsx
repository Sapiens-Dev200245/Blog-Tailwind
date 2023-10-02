import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

function Siglepost() {
  const { userInfo } = useContext(UserContext);
  console.log(userInfo);
  const PostID = useLocation();
  const pf = "http://localhost:5000/images/";
  const [post, setPost] = useState("");
  const [edit, SetEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:5000" + PostID.pathname);
      setPost(res.data.post);
      setTitle(res.data.post.title);
      setDesc(res.data.post.desc);
      console.log(res);
    };
    fetchPost();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const dataset = {
      username: post.username,
      title,
      desc,
    };
    try {
      if (!desc || !title) {
        toast.error("Please enter title or description");
      }
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        dataset.photo = filename;
        try {
          await axios.post("http://localhost:5000/upload", data);
        } catch (err) {
          console.log("Cant Upload");
        }
      } else {
        dataset.photo = post.photo;
      }

      const res = await axios.put(
        "http://localhost:5000" + PostID.pathname,
        dataset
      );
      setPost(res.data.post);
      toast.success("Post has been updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handledelete = async () => {
    const res = await axios.delete("http://localhost:5000" + PostID.pathname);
    toast.success("Post has been deleted");
    navigate("/");
    console.log(res);
  };

  return (
    <div className=" w-full h-full mt-28 px-3  md:px-20 lg:px-28">
      <img
        src={file ? URL.createObjectURL(file) : pf + post.photo}
        alt=""
        className="w-full h-[160px] md:h-[270px] lg:h-[400px] xl:h-[500px] rounded-3xl mb-2"
      />
      {!edit ? (
        <h1 className=" w-full text-center">{post.title}</h1>
      ) : (
        <div>
          <input
            type="text"
            className="w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="img">
            <i className="bx bx-image-add text-5xl cursor-pointer"></i>
          </label>
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      )}

      {/* edit and delete */}
      {userInfo.username === post.username ? (
        <div className="flex gap-1 justify-end items-center">
          <i
            className="bx bx-edit text-teal-700 hover:-translate-y-1 duration-500 cursor-pointer"
            onClick={() => SetEdit(!edit)}
          ></i>
          <i
            className="bx bx-x-circle text-red-600 hover:-translate-y-1 duration-500 cursor-pointer"
            onClick={handledelete}
          ></i>
        </div>
      ) : null}
      {/* author */}
      <div className="flex justify-between">
        <p className="text-amber-400 hover:-translate-y-1 duration-500 cursor-pointer">
          Author:{post.username}
        </p>
        <p className="text-amber-400">
          {new Date(post.createdAt).toDateString()}
        </p>
      </div>
      {/* desc */}
      {!edit ? (
        <p
          className="
      indent-5 
      first-letter:text-lg
      first-letter:text-amber-400
      text-[12px]
      md:text-[16px]"
        >
          {post.desc}
        </p>
      ) : (
        <div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            name=""
            value={desc}
            id=""
            placeholder="Description"
            className="w-full h-[300px] mt-2 outline-none text-[12px] md:text-[16px]"
          ></textarea>
        </div>
      )}
      {edit && (
        <div onClick={() => SetEdit(!edit)}>
          <button
            onClick={handleEdit}
            className="bg-teal-300 text-[10px] md:text-[16px] p-2 md:p-3 rounded-md hover:-translate-y-1 duration-500"
          >
            Save Post
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Siglepost;
