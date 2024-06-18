import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewBlog from "./pages/NewBlog";
import Blog from "./pages/Blog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const routes = (
  <Route path="/" element={<Outlet />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/blog/:id" element={<Blog />} />
    <Route path="/create" element={<NewBlog />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export default router;
