import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState("");
  const pf = "http://localhost:5000/images/";

  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
    setProfile(currentUserData);
    setUser(!!currentUserData);
    console.log("useEffect ทำงาน");
  }, [localStorage]);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.replace("/");
  };

  return (
    <div
      className="fixed 
    top-0 
    z-50 
    left-0 
    w-full 
    px-1 
    h-[60px] 
    sm:px-5 
    md:px-5  
    md:h-[90px] 
    bg-white 
    flex justify-between items-center"
    >
      <div className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px] overflow-hidden bg-slate-400 rounded-full">
        <Link to="/">
          <img
            src="https://images-platform.99static.com//4sAE0-g_qA0-XAYWunH9YKSpsQ8=/160x139:837x816/fit-in/500x500/99designs-contests-attachments/110/110993/attachment_110993584"
            alt=""
            className="scale-150 md:scale-150  rounded-full object-cover"
          />
        </Link>
      </div>
      <div>
        <ul className="hidden md:flex justify-between items-center gap-5">
          <li className="text-sm md:text-xl cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            <Link to="/">Home</Link>
          </li>
          <li className="text-sm md:text-xl cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            <Link to="/">Services</Link>
          </li>
          <li className="text-sm md:text-xl cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            <Link to="/write">Write</Link>
          </li>
          <li className="text-sm md:text-xl cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            <Link to={user ? "/setting" : "/register"}>
              {user ? "Setting" : "Register"}
            </Link>
          </li>
          <li className="text-sm md:text-xl cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            <Link
              to={!user === true ? "/login" : "/logout"}
              onClick={!user === true ? "" : handleLogout}
            >
              {user === true ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <img
          src={
            !user
              ? "https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg "
              : pf + profile?.profilePic
          }
          alt=""
          className="w-12 h-12 md:w-20 md:h-20 cursor-pointer object-fill rounded-full"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <ul className="absolute z-50 text-sm top-14 left-0  text-center w-full bg-white md:hidden">
          <li className="text-sm mt-2 cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            Home
          </li>
          <li className="text-sm mt-2 cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            Services
          </li>
          <li className="text-sm mt-2 cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            Write
          </li>
          <li className="text-sm mt-2 cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            {user === true ? "Setting" : "Register"}
          </li>
          <li className="text-sm mt-2 cursor-pointer hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1">
            {user === true ? "Logout" : "Login"}
          </li>
        </ul>
      )}
    </div>
  );
}
