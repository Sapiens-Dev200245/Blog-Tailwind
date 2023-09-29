import React from "react";
import { useState } from "react";

export default function WritePost() {
  const [img, setImg] = useState(false);
  return (
    <div className="h-screen w-screen mt-40 px-7 md:px-12 lg:px-16 2xl:px-44">
      <div>
        <h1 className=" text-center font-bold text-[10px] md:text-[16px] 2xl:text-[18px]">
          Share Your Story☺️
        </h1>
      </div>
      {img && (
        <img
          className="w-full md:h-[300px] lg:h-[400px] 2xl:h-[500px] rounded-2xl object-fill"
          src={URL.createObjectURL(img)}
          alt=""
        />
      )}
      <div>
        <label
          htmlFor="labelimg"
          className="cursor-pointer 
        border border-slate-700  
        inline-flex p-1 md:p-2 justify-center items-center 
        rounded-full mt-2
        hover:-translate-y-1 duration-500
        mr-2
        "
        >
          <i className="bx bxs-file-image md:scale-150"></i>
        </label>
        <input
          type="file"
          id="labelimg"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Title"
          className="
      border-none outline-none
      text-[12px] md:text-[16px]
      placeholder:text-[12px]
      md:placeholder:text-[16px]
      "
        />
      </div>
      <textarea
        name=""
        id=""
        placeholder="Description"
        className="w-full h-[300px] mt-2 outline-none text-[12px] md:text-[16px]"
      ></textarea>
      <button
        type="submit"
        className="bg-teal-300 text-[10px] md:text-[16px] p-2 md:p-3 rounded-md hover:-translate-y-1 duration-500"
      >
        Save Post
      </button>
    </div>
  );
}
