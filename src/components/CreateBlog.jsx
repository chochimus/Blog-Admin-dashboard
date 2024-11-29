import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postBlog } from "../services/blogs";
import BlogForm from "./BlogForm";
import Logout from "./Logout";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);

  const postBlogMutation = useMutation({
    mutationFn: postBlog,
    onSuccess: () => {
      alert("Blog created successfully");
    },
    onError: () => {
      alert("Failed to create blog");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title,
      content,
      published,
    };
    postBlogMutation.mutate(blog);
  };

  return (
    <div className="flex flex-col p-4 max-w-4xl mx-auto">
      <div className="flex justify-between  pb-6 border-b border-gray-300 mb-4">
        <h2 className="font-bold text-3xl text-gray-800">Create Blog</h2>
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
    </div>
  );
};

export default CreateBlog;
