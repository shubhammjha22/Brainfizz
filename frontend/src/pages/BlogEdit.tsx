import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../auth";
import { useEffect, useState } from "react";

type Inputs = {
  title: string;
  content: string;
};

export default function BlogEdit() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id });
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  //   console.log(id);

  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Reset form values with blog data once loading is complete
  useEffect(() => {
    if (!loading && blog) {
      reset({
        title: blog.title || "",
        content: blog.content || "",
      });
    }
  }, [loading, blog, reset]);
  //   console.log("Blog");

  async function onSubmit(data: Inputs) {
    // console.log(data);
    // console.log(`${BACKEND_URL}/api/blog`);
    setIsDisabled(true);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        { ...data, id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      toast.success("Blog Updated", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        setIsDisabled(true);
        navigate(`/blogs/${id}`);
      }, 2500);
    } catch (e: any) {
      console.log("error is -", e.response.data.error);

      toast.warn(`${e.response.data.error}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsDisabled(false);
    }
  }

  async function handleDelete() {
    if (confirm("You sure you want to delete ?")) {
      console.log("deleting");

      try {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        console.log(res);
        toast.success("Blog Deleted", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          //   setIsDisabled(true);
          navigate(`/blogs/myBlogs`);
        }, 2500);
      } catch (e: any) {
        console.log("error is -", e);

        toast.warn(`There was some error`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsDisabled(false);
      }
    } else {
      console.log("Cancellled");
    }
  }

  return (
    <>
      <NavBar writeMode={true} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="relative  container px-4 md:px-0 md:w-[60%] mt-20 mx-auto  ">
        <button
          onClick={handleDelete}
          disabled={isDisabled}
          className="text-lg ml-2 absolute z-20 top-6 right-10 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="relative border-2 p-4  overflow-visible"
        >
          <textarea
            className=" px-2 py-2 border-b-2 focus:outline-none text-2xl sm:text-4xl font-bold w-full h-auto resize-none overflow-hidden"
            placeholder="Title..."
            // required
            {...register("title")}
            // defaultValue={blog.title}
            rows={2}
            onInput={(e: any) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <textarea
            className=" px-2 mt-4  focus:outline-none text-sm sm:text-xl w-full h-auto resize-none overflow-hidden"
            placeholder="Tell your story..."
            required
            {...register("content")}
            rows={10}
            defaultValue={blog?.content}
            onInput={(e: any) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button
            disabled={isDisabled}
            className=" absolute -bottom-14 left-0 bg-green-400 p-2 text-xs sm:text-base sm:px-4 hover:bg-opacity-90 rounded-xl"
          >
            {isDisabled ? "Please wait.." : "Publish Blog"}
          </button>
        </form>
      </div>
      <div className="min-h-24"></div>
    </>
  );
}
