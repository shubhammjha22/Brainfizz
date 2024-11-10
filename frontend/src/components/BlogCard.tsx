import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  myBlog: boolean;
};

export default function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
  id,
  myBlog,
}: BlogCardProps) {
  const blogId = id;
  const navigate = useNavigate();

  function handleClick() {
    // redirect();
    // console.log(myBlog);
    if (!myBlog) {
      navigate(`/blogs/${blogId}`);
    } else {
      navigate(`/blogs/${blogId}/edit`);
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full mb-4  p-2 rounded-md shadow-md flex flex-col  items-start hover:cursor-pointer"
      >
        <p className="text-xs sm:text-lg  mt-2">
          {authorName}.{" "}
          <span className="text-xs sm:text-base  font-light ml-2">
            {publishedDate}
          </span>
        </p>
        <div className="flex justify-between items-center  w-full">
          <h1 className="relative font-bold text-lg sm:text-2xl">{title}</h1>
          {myBlog ? (
            <div className="flex">
              <button className="flex items-center bg-slate-300 hover:bg-opacity-90 font-bold rounded-lg  text-xs sm:text-sm  p-2 sm:px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>{" "}
                Edit
              </button>
            </div>
          ) : null}
        </div>
        <p className="text-sm sm:text-lg mt-2">
          {content.length > 200
            ? `${content.slice(0, 200) + "..."}`
            : `${content + "..."}`}
        </p>
        <p className="mt-2 text-xs sm:text-base">
          {Math.ceil(content.length / 100) + " min read"}
        </p>
      </div>
    </>
  );
}
