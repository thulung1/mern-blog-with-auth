import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Post() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
      withCredentials: true,
    });
    setPost(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user === null) {
    navigate("/login");
  }

  return (
    <div>
      {post && (
        <div className="max-w-xl md:max-w-4xl mx-auto px-2 mb-2 md:mb-4">
          <div className="max-w-4xl mx-auto ">
            <h3 className="text-2xl md:text-3xl font-bold">{post.title}</h3>
          </div>
          <div className="flex justify-between text-slate-400 mb-2">
            <p className="text-black">by @{post.createdBy?.username}</p>
            <div className="flex gap-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>
                {new Date(post.updatedAt)
                  .toLocaleString("en-IN", { hour12: true })
                  .slice(10, 25)}
              </p>
            </div>
          </div>
          {user._id === post.createdBy._id && (
            <Link to={`/edit/${post._id}`}>
              <div className="">
                <div className="bg-black text-slate-100 flex justify-center items-center mb-2 w-[28%] md:w-[15%] px-1 mx-auto py-2 rounded-md gap-1">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#fff"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                  <div>Edit this post</div>
                </div>
              </div>
            </Link>
          )}
          <div className="flex flex-col justify-center items-center max-w-4xl mx-auto mb-2">
            <img
              src={`${BASE_URL}/` + post.photo}
              alt=""
              className="md:max-w-[800px] max-h-[800px] object-cover"
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          />
        </div>
      )}
    </div>
  );
}
