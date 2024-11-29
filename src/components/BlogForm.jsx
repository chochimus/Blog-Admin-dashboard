import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const BlogForm = ({
  title,
  setTitle,
  content,
  setContent,
  published,
  setPublished,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-4xl mx-auto p-6 bg-white space-y-6"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="content" className="font-semibold text-gray-700 mb-2">
          Content
        </label>
        <MDEditor
          id="content"
          value={content}
          onChange={setContent}
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
        />
      </div>
      <div className="flex items-center">
        <input
          id="checkbox"
          type="checkbox"
          checked={published}
          onChange={({ target }) => setPublished(target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="checkbox" className="ml-2 text-gray-700">
          Published
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
      >
        Save Changes
      </button>
    </form>
  );
};

export default BlogForm;
