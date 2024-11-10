import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = async (data: Inputs) => {
    setIsDisabled(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        ...data,
      });
      toast.success("Signup successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      localStorage.setItem("token", `Bearer ${res.data.jwt}`);
      localStorage.setItem("name", res.data.name);
      console.log(res.data);
      console.log(res);
      setTimeout(() => {
        // setIsDisabled(true);
        navigate("/blogs");
      }, 2500);
    } catch (e: any) {
      toast.warn(`${e.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      console.log("error is -", e.response.data);
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
        <h1 className="text-4xl font-bold">Create an Account&nbsp;</h1>
        <p className="text-lg font-normal">
          Already have an account?{" "}
          <NavLink to="/signin" className="underline">
            {" "}
            Login
          </NavLink>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col text-lg w-full gap-1"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            required
            className="mb-2 py-1 px-4 rounded-lg border-2 active:border-opacity-100 border-black border-opacity-20 text-base"
            placeholder="Enter your Name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            {...register("email")}
            className="mb-2 py-1 px-4 rounded-lg border-2 active:border-opacity-100 border-black border-opacity-20 text-base"
            placeholder="johndoe@gmail.com"
          />
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            {...register("password")}
            className="mb-2 py-1 px-4 rounded-lg border-2 active:border-opacity-100 border-black border-opacity-20 text-base"
          />
          <button
            className={`${
              isDisabled ? "bg-opacity-40" : ""
            } mt-4 w-full py-1 hover:bg-opacity-80 transition-all duration-200 delay-100 bg-black text-white text-center rounded-lg`}
          >
            {isDisabled ? "Please wait.." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};
