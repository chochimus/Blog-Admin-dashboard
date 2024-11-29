import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../services/logout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["loggedIn"]);
      navigate("/");
    },
    onError: (error) => {
      alert("unexpected error occured");
    },
  });

  const handleLogout = async () => {
    postLogoutMutation.mutate();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
    >
      Logout
    </button>
  );
};

export default Logout;
