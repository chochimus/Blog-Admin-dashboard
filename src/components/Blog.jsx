import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs";
import Comments from "./Comments";

const Blog = ({ loggedIn }) => {
  const navigate = useNavigate();

  if (!loggedIn) navigate("/login");

  const { id } = useParams();

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-2 py-6">
      <h2 className="font-bold text-5xl text-gray-900 mb-6">{blog.title}</h2>
      <div className="mb-6">{blog.content}</div>
      <Comments blogId={id} comments={blog.comments} />
    </div>
  );
};

export default Blog;