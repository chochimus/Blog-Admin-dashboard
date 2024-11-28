import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/blogs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkLogin } from "../services/checkLogin";

const Blogs = () => {
  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  //TODO add an edit buton to quickly update published or not
  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto">
      <h1 className="font-bold text-3xl text-gray-800 pb-6 border-b border-gray-300">
        Blogs
      </h1>
      <div className="flex flex-col">
        <ul>
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition duration-150"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="block pl-4 py-6 font-semibold text-2xl text-gray-600 hover:text-gray-800 transition duration-150"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Blogs;
