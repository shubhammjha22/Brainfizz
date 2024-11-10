export function BlogSkeleton() {
  return (
    <>
      <div
        role="status"
        className="w-full mb-4  p-2 rounded-md shadow-md flex flex-col  items-start animate-pulse"
      >
        <p className="text-lg w-32 h-8 bg-gray-300 mb-4 mt-2">
          <span className="text-base bg-gray-200 w-10 h-2 font-light ml-2"></span>
        </p>
        <div className="flex bg-gray-200 w-full h-12 justify-between items-center ">
          <h1 className="relative font-bold text-2xl"></h1>
        </div>
        <p className="text-lg w-full bg-gray-300 h-36 mt-2"></p>
        <p className="mt-2 bg-gray-200 h-4 w-28"></p>
      </div>
    </>
  );
}

export function BlogFullSkeleton() {
  return (
    <>
      <div
        role="status"
        className="container animate-pulse flex sm:flex-row  flex-col sm:px-0 px-2 gap-20 w-full  mt-32 mx-auto "
      >
        <div className="sm:w-[70%] -mb-16 sm:mb-4   p-2 rounded-md shadow-md flex flex-col  items-start ">
          <h1 className="font-bold bg-gray-300 w-[100%] h-20 text-5xl"></h1>
          <p className="text-lg bg-gray-200 w-1/2 mt-2">
            <span className="text-base font-light ml-2"></span>
          </p>
          <p className="text-lg bg-gray-300 w-full h-60 mt-2">
            {/* {content.length > 200
            ? `${content.slice(0, 200) + "..."}`
            : `${content + "..."}`} */}
          </p>
          <p className="mt-2 bg-gray-200 h-4  text-right w-full"></p>
        </div>
        <div className="sm:w-[30%] sm:mb-0  mb-14 ">
          <div className="flex flex-col justify-start gap-4">
            <h4 className="text-lg">Author</h4>
            <div className="flex  items-center gap-4">
              <div className="bg-slate-300 min-h-8 min-w-8 flex items-center justify-center rounded-full ">
                <span className="text-center w-full h-full text-sm font-semibold"></span>
              </div>

              <div className="flex flex-col justify-center item-center">
                <h1 className="text-2xl bg-gray-300 h-8 mb-4 w-44 font-bold "></h1>
                <p className="text-sm bg-gray-200 h-24 w-[20rem]">
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis aspernatur impedit ratione corrupti modi? */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
