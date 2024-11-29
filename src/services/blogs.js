import axios from "./axios";

const baseUrl = "https://myblogapi-2f5b.onrender.com/api/blogs";

export const postBlog = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

export const updateBlog = async ({ id, blog }) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl, {
    params: { includeUnpublished: true },
  });
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const deleteComment = async ({ blogId, commentId }) => {
  const response = await axios.delete(
    `${baseUrl}/${blogId}/comments/${commentId}`
  );
  return response.data;
};
