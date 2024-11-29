import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll } from "../services/blogs";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { deleteBlog } from "../services/blogs";

const Blogs = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      alert("Falied to delete blog.");
    },
  });

  const handleBlogDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate(blogId);
    }
  };

  const {
    data: blogs = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    retry: 0,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    if (error.response.status === 403) {
      navigate("/");
    }
  }
  //TODO add an edit buton to quickly update published or not
  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto">
      <div className="flex justify-between  pb-6 border-b border-gray-300 mb-4">
        <h1 className="font-bold text-3xl text-gray-800">Blogs</h1>
        <Logout />
      </div>
      <Link to={`/blogs/create`} className="text-blue-500 hover:underline mb-4">
        Create New
      </Link>
      <div className="grid grid-cols-2 gap-9">
        <div>
          <h2 className="font-semibold text-xl text-gray-700 mb-4">
            Published Blogs
          </h2>
          <ul>
            {blogs
              .filter((blog) => blog.published)
              .map((blog) => (
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
                  <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                    <button
                      type="button"
                      onClick={() => handleBlogDelete(blog.id)}
                      disabled={deleteBlogMutation.isLoading}
                      className={`ml-4 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-xl text-gray-700 mb-4">
            Unpublished Blogs
          </h2>
          <ul>
            {blogs
              .filter((blog) => !blog.published)
              .map((blog) => (
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
                  <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                    <button
                      type="button"
                      onClick={() => handleBlogDelete(blog.id)}
                      disabled={deleteBlogMutation.isLoading}
                      className={`ml-4 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
