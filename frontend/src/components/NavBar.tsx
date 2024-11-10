import { useNavigate, NavLink } from "react-router-dom";
import NavLogo from "./NavLogo";
import { useEffect, useRef, useState } from "react";
export default function NavBar({ writeMode = false }: { writeMode: boolean }) {
  //   console.log(name);

  // console.log("inside nav");
  const [isOpen, setIsOpen] = useState(false); // State to track the mobile menu

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  function handleClick() {
    const url = writeMode ? "/blogs" : "/blogs/new";
    navigate(url);
  }

  const navRef: any = useRef(null); // Create a reference for the navbar

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add("backdrop-blur-md");
        } else {
          navRef.current.classList.remove("backdrop-blur-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-0 z-50 w-full h-[4.5rem] border-b-2 p-2 flex  justify-between items-center gap-4 border- overflow-"
      >
        <a
          className="text-left text-2xl sm:text-xl md:text-3xl  w-[12%] font-semibold font-serif"
          // onClick={navigate("/blogs")}
          href="/blogs"
        >
          BrainFizz
        </a>

        {/* Seaarch bar */}
        <div className="hidden sm:flex w-full ml-4 ">
          <div className="flex px-4 justify-start items-center bg-slate-200 h-10 rounded-xl w-[40%] md:w-[30%] ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <input
              type="text"
              name=""
              className="w-[80%] px-2 bg-transparent border-none focus:outline-none border-red-400"
              id=""
              placeholder="Search"
            />
          </div>
        </div>

        {/* RIght side */}

        <div className="hidden sm:flex md:gap-2 ml-0  w-[15%]">
          <div className="flex justify-center items-center">
            {!writeMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <button
                  className="font-light text-md md:text-lg ml-1"
                  onClick={handleClick}
                >
                  {" "}
                  Write
                </button>
              </>
            ) : (
              <button
                className="font-semibold bg-green-500 xl:p-2 px-1 py-2 -mr-3 rounded-2xl text-white text-sm "
                onClick={handleClick}
              >
                {" "}
                Go to Blogs
              </button>
            )}
          </div>
          <NavLogo />
        </div>

        <div className="sm:hidden absolute top-4 right-4 text-white">
          <button onClick={toggleMenu}>{isOpen ? null : <Hamburger />}</button>
        </div>

        <div
          className={`fixed inset-0 z-40  transform ${
            isOpen ? "translate-x-[40%]" : "translate-x-full"
          } transition-transform duration-300 ease-in-out `}
        >
          <div className="p-6  bg-black bg-opacity-90  h-[100vh]">
            <button onClick={toggleMenu} className="text-white">
              {/* <HiArrowLeft size={24} /> */}
              <LeftArrow />
            </button>
            <div className="mt-10 flex flex-col justify-center gap-6  text-white">
              <NavLink
                to="/blogs/new"
                onClick={toggleMenu}
                className="flex text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <button
                  className="font-semibold text-md md:text-lg ml-1"
                  // onClick={handleClick}
                >
                  {" "}
                  Write
                </button>
              </NavLink>
              <NavLink
                to="/blogs/myBlogs"
                onClick={toggleMenu}
                className="block text-lg"
              >
                My Blog
              </NavLink>
              <NavLink
                to="/signin"
                onClick={toggleMenu}
                className="block text-lg"
              >
                Sign out
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-10 bg-[#191919] bg-opacity-40 rounded-xl p-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);
