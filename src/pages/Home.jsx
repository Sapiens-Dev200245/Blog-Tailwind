import React, { useEffect, useState } from "react";
import Test from "../components/SlideImg";
import Posts from "../components/Posts";
import axios from "axios";
function Home() {
  const [allposts, setAllposts] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://api-blog-mquf.onrender.com/all/posts");
      setAllposts(res.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Test />
      <Posts posts={allposts} />
    </div>
  );
}

export default Home;
