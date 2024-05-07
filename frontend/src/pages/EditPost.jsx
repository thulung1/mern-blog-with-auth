import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../url";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/api/v1/blog/${id}`, {
      withCredentials: true,
    });
    setTitle(response.data.title);
    setDescription(response.data.description);
    // setFile(response.data.file)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatePost = async () => {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("file", file);
    data.set("id", id)

    await axios.put(`${BASE_URL}/api/v1/blog`, data, {withCredentials: true});
    navigate(`/post/${id}`)
  };

  return (
    <div>
      <div className="flex flex-col w-[90vw] mx-auto mt-10">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="p-4 outline-none border-2 mb-2"
          type="text"
          placeholder="Title"
        />
        <span className="text-red-500">*</span>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="p-4 border-2 mb-2"
          type="file"
          name="file"
        />
        <ReactQuill
          onChange={(e) => setDescription(e)}
          value={description}
          modules={modules}
          formats={formats}
        />

        <button
          onClick={handleUpdatePost}
          className="bg-black text-white uppercase mt-2 mb-4 p-4 w-full hover:opacity-85"
        >
          Update Post
        </button>
      </div>
    </div>
  );
}
