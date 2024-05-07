import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../url";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/user/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });
    dispatch(signOut());
  };

  return (
    <div className="border-b-2 py-4 px-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to={"/"}>
          <h3 className="text-2xl md:text-3xl font-bold">My Blog</h3>
        </Link>

        {!user.currentUser && (
          <ul className="flex gap-2">
            <Link to={"/login"}>
              <li>Login</li>
            </Link>
            <Link to={"/register"}>
              <li>Register</li>
            </Link>
          </ul>
        )}

        {user.currentUser && (
          <>
            <ul className="flex gap-2">
              <Link to={"/create"}>
                <li>Create New Post</li>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
