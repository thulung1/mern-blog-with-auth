import { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import axios from "axios";
import { BASE_URL } from "../url";
import { Oval } from "react-loading-icons";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/blog`);
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Oval strokeWidth={4} stroke="black" />
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <HomePosts key={post._id} {...post} />)}

      {posts.length === 0 && (
        <div className="flex flex-col justify-center items-center text-2xl md:text-3xl font-bold min-h-[80vh] text-slate-600">
          <div>No Blog posted.</div>
          <div>Always be the first one to do it.</div>
        </div>
      )}
    </>
  );
}
