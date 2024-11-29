import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import EditBlog from "./components/EditBlog";
import { checkLogin } from "./services/checkLogin";
import CreateBlog from "./components/CreateBlog";
import AuthContext from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const {
    data: loggedIn,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["loggedIn"],
    queryFn: checkLogin,
    onSuccess: (data) => console.log(data),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading login status</div>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
