import { useNavigate } from "react-router-dom";

export default function DropDown() {
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.clear();
    console.log("inside button click");

    navigate("/signin");
  }
  function handleBlog() {
    // localStorage.clear();
    console.log("inside blog click");

    navigate("/blogs/myBlogs");
  }

  return (
    <>
      <div
        id="dropdown"
        className="z-10  bg-slate-300 text-black  divide-gray-100 rounded-lg shadow  absolute right-[1.5vw] w-[4rem] md:w-[6rem]"
      >
        <ul
          className="py-0 text-sm md:text-md "
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <button
              onClick={handleBlog}
              className="block w-full rounded-lg py-2 hover:bg-gray-600 hover:text-white"
            >
              My Blogs
            </button>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="block rounded-lg md:px-4 py-2 w-full hover:bg-gray-600 hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
