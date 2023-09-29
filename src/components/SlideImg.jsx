import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const data = [
  {
    url: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2023/03/Solo_Leveling_Arise_Website_Feature-1-1.jpg",
  },
  {
    url: "https://images5.alphacoders.com/120/1206701.jpg",
  },
];

export default function SlideImg() {
  return (
    <div className=" px-6 h-[250px] w-full mt-20 md:mt-40 rounded-2xl md:h-[400px] md:px-12 lg:h-[500px] lg:px-28 ">
      <Slide>
        {data.map((slideImage, index) => (
          <img
            src={slideImage.url}
            alt=""
            className="w-full h-[250px]  md:h-[400px] lg:h-[500px] rounded-2xl "
            key={index}
          />
        ))}
      </Slide>
    </div>
  );
}
