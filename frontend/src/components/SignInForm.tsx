import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = async (data: Inputs) => {
    setIsDisabled(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        ...data,
      });

      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      //   saving in localstorage the token
      localStorage.setItem("token", `Bearer ${res.data.jwt}`);
      localStorage.setItem("name", res.data.name);

      console.log(res.data);
      console.log(res);

      setTimeout(() => {
        navigate("/blogs");
      }, 2500);
    } catch (e: any) {
      console.log("error is -", e.response.data);
      toast.warn(`${e.response.data.error}`, {
        position: "top-right",
        autoClose: 3000,
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
  };

  return (
    <>
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
      <div className="flex flex-col justify-center h-screen  items-center">
        <h1 className="text-4xl font-bold">Login your account</h1>
        <p className="text-lg font-normal">
          Don't have an account?{" "}
          <NavLink to="/signup" className="underline">
            {" "}
            Sign up
          </NavLink>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col text-lg w-full gap-1"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            {...register("email")}
            className="mb-2 py-1 px-4 rounded-lg border-2 active:border-opacity-100 border-black border-opacity-20 text-base"
            placeholder="johndoe@gmail.com"
          />
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            {...register("password")}
            className="mb-2 py-1 px-4 rounded-lg border-2 active:border-opacity-100 border-black border-opacity-20 text-base"
          />
          <button
            disabled={isDisabled}
            className="mt-4 w-full py-1 hover:bg-opacity-80 transition-all duration-200 delay-100 bg-black text-white text-center rounded-lg"
          >
            {isDisabled ? "Please wait.." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};
