import { userTokenAtom } from "../state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";

function Dashboard() {
  const userToken = useRecoilValue(userTokenAtom);
  const nav = useNavigate();
  useEffect(() => {
    if (userToken === "") nav("/signin");
  }, []);

  const { blogs, loading } = useBlogs();

  if (loading) return "loading ...";

  return (
    <div>
      <Appbar>
        <button
          onClick={() => nav("/create")}
          className="bg-green-600 text-white rounded-full px-5 py-2"
        >
          Create
        </button>
      </Appbar>
      <div className="m-20 flex flex-col gap-6">
        {blogs.map((ele, ind) => (
          <BlogCard
            key={ind}
            index={ele.id}
            title={ele.title}
            author={ele.author}
          />
        ))}
      </div>
    </div>
  );
}
export default Dashboard;

interface BlogProps {
  title: string;
  author: string;
  index: string;
}
function BlogCard({ title, author, index }: BlogProps) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/blog/${index}`)}
      className="bg-slate-300 p-5 rounded-3xl"
    >
      <div className="text-2xl font-bold tracking-tighter mb-4">{title}</div>
      <div className="text-gray-500">{author}</div>
    </div>
  );
}
