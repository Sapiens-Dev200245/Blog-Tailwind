import React from "react";

function Siglepost() {
  return (
    <div className=" w-full h-full mt-28 px-3  md:px-20 lg:px-28">
      <img
        src="https://images5.alphacoders.com/120/1206701.jpg"
        alt=""
        className="w-full h-[160px] md:h-[270px] lg:h-[400px] xl:h-[500px] rounded-3xl mb-2"
      />
      <h1 className=" w-full text-center">Slime</h1>
      <div className="flex gap-1 justify-end items-center">
        <i className="bx bx-edit text-teal-700 hover:-translate-y-1 duration-500 cursor-pointer"></i>
        <i className="bx bx-x-circle text-red-600 hover:-translate-y-1 duration-500 cursor-pointer"></i>
      </div>
      <div className="flex justify-between">
        <p className="text-amber-400 hover:-translate-y-1 duration-500 cursor-pointer">
          Author:
        </p>
        <p className="text-amber-400">Mon 27 2002</p>
      </div>
      <p
        className="
      indent-5 
      first-letter:text-lg
      first-letter:text-amber-400
      text-[12px]
      md:text-[16px]"
      >
        Solo Leveling, also alternatively translated as Only I Level Up (Korean:
        나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel
        written by Chugong. It was serialized in Kakao's digital comic and
        fiction platform KakaoPage beginning on July 25, 2016, and was later
        published in full by D&C Media under their Papyrus label on November 4,
        2016. The novel has been licensed in English by Yen Press.[1]",
      </p>
    </div>
  );
}

export default Siglepost;
