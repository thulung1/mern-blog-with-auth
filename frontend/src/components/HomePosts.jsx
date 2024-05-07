import { Link } from "react-router-dom";
import { BASE_URL } from "../url";

export default function HomePosts({
  _id,
  photo,
  title,
  description,
  updatedAt,
  createdBy,
}) {
  return (
    <div>
      <Link to={`/post/${_id}`}>
      <div className="max-w-4xl mx-auto my-4 py-4 border-b-2 px-2">
        <div className="md:grid md:grid-cols-12 gap-4">
          <div className="col-span-6">
            <img
              src={`${BASE_URL}/` + photo}
              alt=""
              className="w-full max-h-40 md:max-h-64 object-cover"
            />
          </div>
          <div className="col-span-6">
            <h3 className="text-3xl font-bold">{title}</h3>
            <div className="flex justify-between text-slate-400">
              <p className="text-black">by @{createdBy?.username}</p>
              <div className="flex flex-col md:flex-row gap-2">
                <p>{new Date(updatedAt).toString().slice(0, 15)}</p>
                <p>
                  {new Date(updatedAt)
                    .toLocaleString("en-IN", { hour12: true })
                    .slice(10, 25)}
                </p>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.length < 250
                    ? description
                    : description.slice(0, 250) + " ...Read more",
              }}
            />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
