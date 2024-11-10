import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useBlog } from "../auth";
import { BlogFullSkeleton } from "../components/BlogSkeleton";

export default function BlogFull() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id });

  return (
    <>
      <NavBar writeMode={false} />

      {loading == false ? (
        <>
          <div className="container px-2 sm:px-0 flex sm:flex-row flex-col sm:gap-20 w-full  mt-32 mx-auto ">
            <div className="sm:w-[70%] mb-4  p-2 rounded-md shadow-md flex flex-col  items-start ">
              <h1 className="font-bold text-2xl  sm:text-5xl">{blog?.title}</h1>
              <p className="text-lg  mt-2">
                <span className="text-base font-light ml-2">
                  Posted on 6 Oct, 2013
                </span>
              </p>
              <p className="text-base sm:text-lg mt-2">
                {/* {content.length > 200
            ? `${content.slice(0, 200) + "..."}`
            : `${content + "..."}`} */}
                {blog?.content}
              </p>
              <p className="mt-2 text-right w-full">
                {Math.ceil((blog?.content?.length || 0) / 100) + " min read"}
              </p>
            </div>
            <div className="sm:w-[30%] mb-16 sm:mb-0">
              <div className="flex flex-col justify-start gap-4">
                <h4 className="text-lg">Author</h4>
                <div className="flex  items-center gap-4">
                  <div className="bg-slate-300 min-h-8 min-w-8 flex items-center justify-center rounded-full ">
                    <span className="text-center w-full h-full text-sm font-semibold">
                      {blog?.author ? `${blog.author.name[0]}` : "G"}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center item-center">
                    <h1 className="text-2xl font-bold ">{blog?.author.name}</h1>
                    <p className="text-sm ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis aspernatur impedit ratione corrupti modi?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <BlogFullSkeleton />
      )}
    </>
  );
}

// function loader() {
//   return (
//     <>
//       <div>Loading..</div>
//     </>
//   );
// }
