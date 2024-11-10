import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Inputs = {
  title: string;
  content: string;
};

export default function BlogCreate() {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  async function onSubmit(data: Inputs) {
    console.log(data);
    console.log(`${BACKEND_URL}/api/blog`);
    setIsDisabled(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { ...data },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      toast.success("Blog Created", {
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
        // setIsDisabled(true);
        navigate(`/blogs/${res.data.id}`);
      }, 2500);
    } catch (e: any) {
      console.log(e.response);

      toast.warn(`${e.response.data.message}`, {
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
      <div className="relative container px-4 md:px-0 md:w-[60%] mt-20 mx-auto ">
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
            onInput={(e: any) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button
            disabled={isDisabled}
            className=" absolute -bottom-14 left-0 bg-green-400 p-2  text-xs sm:text-base sm:px-4 hover:bg-opacity-90 rounded-xl"
          >
            {isDisabled ? "Please wait.." : "Publish Blog"}
          </button>
        </form>
      </div>
      <div className="min-h-24"></div>
    </>
  );
}
