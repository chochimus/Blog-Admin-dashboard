import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "./services/logout";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import { postLogin } from "./services/login";
import { checkLogin } from "./services/checkLogin";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin().then((data) => {
      setLoggedIn(data.loggedIn);
    });
  }, []);

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setLoggedIn(false);
      redirect("/login");
    },
    onError: (error) => {
      alert("unexpected error occured");
    },
  });

  const handleLogout = async () => {
    postLogoutMutation.mutate();
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/blogs" element={<Blogs loggedIn={loggedIn} />} />
        <Route path="/blogs/:id" element={<Blog loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
};
export default App;
