import { useNavigate, useSearchParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useBlog } from "../hooks";
import { useEffect } from "react";

function Blog() {
  const nav = useNavigate();
  const path = window.location.pathname.split("/");
  const id = path[path.length - 1];

  useEffect(() => {
    if (!id) nav("/");
  }, []);

  const { blog, loading } = useBlog(id || "");

  if (loading) return "loading...";

  return (
    <div className="grid grid-rows-12">
      <Appbar>{""}</Appbar>
      <div className="grid grid-cols-4 w-full h-full pt-20 row-span-11">
        <div className="col-span-3 px-20">
          <div className="text-5xl font-black mb-8 tracking-tighter">
            {blog.title}
          </div>
          <div className="text-gray-800">{blog.content}</div>
        </div>
        <div>
          <div className="p-4 text-xl font-black flex gap-3 items-center">
            <div className="h-10 w-10 rounded-full bg-gray-400" />
            {blog.author}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
