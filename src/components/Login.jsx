import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postLogin } from "../services/login";
import { postLogout } from "../services/logout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    postLoginMutation.mutate(credentials);
  };

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      if (data.role === "ADMIN") {
        setUsername("");
        setPassword("");
        await queryClient.invalidateQueries(["loggedIn"]);
        navigate("/blogs");
      } else {
        postLogout();
        alert("You are not authorized to log in.");
      }
    },
    onError: (error) => {
      if (error.response) {
        const { data } = error.response;

        if (data.error === "You are already logged in") {
          navigate("/blogs");
        } else if (data.errors) {
          const validationErrors = data.errors
            .map((err) => `${err.msg} (${err.param})`)
            .join("\n");
          alert(`Validation errors:\n${validationErrors}`);
        }
      } else if (error.request) {
        alert("No response from the server. Please try again later.");
      } else {
        alert(`Error: ${error.message}`);
      }
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        login
      </h2>
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username:{" "}
            </label>
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password:{" "}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
