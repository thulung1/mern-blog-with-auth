import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../url";
import { UserContext } from "../context/userContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(false)
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data) {
        setError(false);
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        setUser(res.data)
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex min-h-[80vh]">
      <div className="flex flex-col justify-center mx-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Login</h1>
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
            onClick={handleLogin}
            className="bg-black text-white uppercase mb-4 p-4 w-[80vw] md:w-[40vw] hover:opacity-85"
          >
            Login
          </button>
        </div>

        <p className="text-red-500">
          {error ? error?.response?.data?.message ||"Something went wrong": ""}
        </p>

        <div className="flex gap-1">
          <p>Already have an account?</p>
          <p className="text-slate-500">
            <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
