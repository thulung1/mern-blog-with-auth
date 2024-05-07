import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { BASE_URL } from "../url";
import { useNavigate } from 'react-router-dom';

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

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate()

  const handleCreateNewPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      await axios.post(`${BASE_URL}/api/v1/blog`, formData, {withCredentials: true});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
          onClick={handleCreateNewPost}
          className="bg-black text-white uppercase mt-2 mb-4 p-4 w-full hover:opacity-85"
        >
          Create Post
        </button>
      </div>
    </div>
  );
}
