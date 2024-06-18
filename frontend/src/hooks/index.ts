import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userTokenAtom } from "../state";
interface Blog {
  id: string;
  title: string;
  author: string;
}

type BlogResType = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string | null;
  };
};

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useRecoilValue(userTokenAtom);

  useEffect(() => {
    axios
      .get<{ blogs: BlogResType[] }>(
        "https://week-13-backend.lollolipop6969.workers.dev/api/v1/blogs/bulk",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setBlogs(
          res.data.blogs.map((ele) => ({
            author: ele.author.name || "Anonymous",
            id: ele.id,
            title: ele.title,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { blogs, loading };
}

type FullBlog = Blog & {
  content: string;
};

export function useBlog(id: string) {
  const [blog, setBlog] = useState<FullBlog>({
    author: "",
    id: "",
    content: "",
    title: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const token = useRecoilValue(userTokenAtom);

  useEffect(() => {
    axios
      .get<{ blog: BlogResType }>(
        `https://week-13-backend.lollolipop6969.workers.dev/api/v1/blog/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setBlog({
          author: res.data.blog.author.name || "Anonymous",
          content: res.data.blog.content,
          id: res.data.blog.id,
          title: res.data.blog.title,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { blog, loading };
}
