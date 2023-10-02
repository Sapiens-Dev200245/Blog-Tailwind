import React, { useState } from "react";
import { Link } from "react-router-dom";
const AllPosts = [
  {
    pic: "https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2020/08/hiker-1149877_1280.jpg?fit=1280%2C853&ssl=1",
    title: "Travel",
    desc: "Solo Leveling, also alternatively translated as Only I Level Up (Korean: 나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel written by Chugong. It was serialized in Kakao's digital comic and fiction platform KakaoPage beginning on July 25, 2016, and was later published in full by D&C Media under their Papyrus label on November 4, 2016. The novel has been licensed in English by Yen Press.[1]",
  },
  {
    pic: "https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2020/08/hiker-1149877_1280.jpg?fit=1280%2C853&ssl=1",
    title: "Travel",
    desc: "Travel With My Family",
  },
  {
    pic: "https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2020/08/hiker-1149877_1280.jpg?fit=1280%2C853&ssl=1",
    title: "Travel",
    desc: "Solo Leveling, also alternatively translated as Only I Level Up (Korean: 나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel written by Chugong. It was serialized in Kakao's digital comic and fiction platform KakaoPage beginning on July 25, 2016, and was later published in full by D&C Media under their Papyrus label on November 4, 2016. The novel has been licensed in English by Yen Press.[1]",
  },
  {
    pic: "https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2020/08/hiker-1149877_1280.jpg?fit=1280%2C853&ssl=1",
    title: "Travel",
    desc: "Solo Leveling, also alternatively translated as Only I Level Up (Korean: 나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel written by Chugong. It was serialized in Kakao's digital comic and fiction platform KakaoPage beginning on July 25, 2016, and was later published in full by D&C Media under their Papyrus label on November 4, 2016. The novel has been licensed in English by Yen Press.[1]",
  },
  {
    pic: "https://i0.wp.com/menaentrepreneur.org/wp-content/uploads/2020/08/hiker-1149877_1280.jpg?fit=1280%2C853&ssl=1",
    title: "Travel",
    desc: "Solo Leveling, also alternatively translated as Only I Level Up (Korean: 나 혼자만 레벨업; RR: Na Honjaman Rebeleop), is a South Korean web novel written by Chugong. It was serialized in Kakao's digital comic and fiction platform KakaoPage beginning on July 25, 2016, and was later published in full by D&C Media under their Papyrus label on November 4, 2016. The novel has been licensed in English by Yen Press.[1]",
  },
];
function Posts({ posts }) {
  const postsArray = Object.values(posts);
  const pf = "http://localhost:5000/images/";
  return (
    <div className="grid grid-cols-2 gap-3 w-full mt-9 px-4 md:grid-cols-3 md:px-10 lg:px-28 2xl:grid-cols-4 ">
      {postsArray.map((p) => (
        <div>
          <div
            key={p._id}
            className=" flex items-center w-full h-[150px] md:h-[250px] flex-col bg-slate-700"
          >
            <img
              src={pf + p.photo}
              alt=""
              className="min-h-full min-w-full rounded-xl
            shadow-slate-700 shadow-xl "
            />
          </div>
          <div className="max-h-full w-full ">
            <Link to={`/${p._id}`}>
              <h1
                className="
              flex
              justify-center
              text-center
              text-[8px] 
              mt-2
              md:text-[15px] 
              lg:text-[18px] 
              cursor-pointer 
              hover:text-red-400 duration-500 ease-in-out hover:-translate-y-1
              "
              >
                {p.title}
              </h1>
            </Link>
            <p className="indent-5 text-[8px]  md:text-[13px] lg:text-[18px]  ">
              {p.desc.slice(0, 150) + "..."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
