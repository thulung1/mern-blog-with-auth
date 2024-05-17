import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, {
        username,
        email,
        password,
      });
      if (res.data) {
        navigate("/login");
        setError(false);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[80vh]">
      <div className="flex flex-col justify-center mx-auto">
        <div className="flex flex-col justify-center items-center w-full ">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Register</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="p-4 bg-slate-100 outline-none mb-4 w-[80vw] md:w-[40vw]"
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-4 bg-slate-100 outline-none mb-4 w-[80vw] md:w-[40vw]"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-4 bg-slate-100 outline-none mb-4 w-[80vw] md:w-[40vw]"
            type="password"
            placeholder="password"
          />
          <button
            onClick={handleRegister}
            className="bg-black text-white uppercase mb-4 p-4 w-[80vw] md:w-[40vw] hover:opacity-85"
          >
            Register
          </button>
        </div>
        {error && (
          <p className="text-red-500">Something went wrong! Try again</p>
        )}

        <div className="flex gap-1">
          <p>Already have an account?</p>
          <p className="text-slate-500">
            <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
