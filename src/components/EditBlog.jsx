import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../services/blogs";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { updateBlog } from "../services/blogs";
import BlogForm from "./BlogForm";
import Logout from "./Logout";

const Blog = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTitle(blog.title);
      setPublished(blog.published);
    }
  }, [blog]);

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      alert("Blog updated successfully");
    },
    onError: () => {
      alert("Failed to update blog");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title,
      content,
      published,
    };
    updateBlogMutation.mutate({ id, blog });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto">
      <div className="flex justify-between  pb-6 border-b border-gray-300 mb-4">
        <h2 className="font-bold text-3xl text-gray-800">Edit Blog</h2>
        <Logout />
      </div>
      <BlogForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        published={published}
        setPublished={setPublished}
        onSubmit={handleSubmit}
      />
      <Comments blogId={id} comments={blog.comments} />
    </div>
  );
};

export default Blog;
