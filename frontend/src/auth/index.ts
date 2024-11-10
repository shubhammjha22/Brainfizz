import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Author {
  name: string;
}

interface Blog {
  author: Author;
  title: string;
  content: string;
  id: string;
}

interface Blogs {
  name: string;
  posts: Blog[];
}

export const useBlogs = ({ myBlog = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs>();

  const url = `api/v1/${!myBlog ? "blog/bulk" : "user/blogs"}`;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/${url}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error is -", e);
        navigate("/signin");
      });
  }, [myBlog]);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string | undefined }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error is -", e);
        navigate("/signin");
      });
  }, []);

  return {
    loading,
    blog,
  };
};
