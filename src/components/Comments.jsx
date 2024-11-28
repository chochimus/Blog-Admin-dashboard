import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../services/blogs";

const Comments = ({ blogId, comments }) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
    },
  });

  const handleCommentDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate({ blogId, commentId });
    }
  };

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto p-4 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
      <ul className="space-y-4 mb-6">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="text-gray-800">{comment.content}</div>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              <span>- {comment.user.username}</span>
              <button
                type="button"
                onClick={() => handleCommentDelete(comment.id)}
                disabled={deleteCommentMutation.isLoading}
                className={`ml-4 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
