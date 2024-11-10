import { NavLink } from "react-router-dom";
import { useBlogs } from "../auth";
import BlogCard from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import NavBar from "../components/NavBar";

export default function BlogPage({ myBlog }: { myBlog: boolean }) {
  // useEffect(() => {
  //   console.log("myBlog changed:", myBlog);
  // }, [myBlog]);

  const { loading, blogs } = useBlogs({ myBlog });
  console.log("inside blog page -", myBlog);
  // const Loading = false;
  console.log("here is blog info- ", blogs?.posts);

  const isEmpty = blogs?.posts?.length === 0;
  console.log("so is blog empty -", isEmpty);

  return (
    <>
      <NavBar writeMode={false} />

      <div className="container lg:w-[60%] mt-20 mx-auto ">
        {!loading ? (
          blogs?.posts.map((blog) => (
            <BlogCard
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="Feb 3,2024"
              id={blog.id}
              myBlog={myBlog}
              key={blog.id}
            />
          ))
        ) : (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        )}

        {isEmpty ? (
          <>
            <div className="flex flex-col h-full  justify-center items-center">
              <h1 className="text-3xl">No Blog found</h1>
              <NavLink className="underline text-xl" to="/blogs/new">
                Create a new one ?
              </NavLink>
            </div>
          </>
        ) : (
          ""
        )}
        {/* <BlogCard
          myBlog={false}
          authorName="Shubham"
          title="How an Ugly Single-Page website makes $5,000 a month with Affiliate Marketing"
          content="No need to create a fancy and modern website with hundred of pages to make money online. --Making money online is a dream for man"
          publishedDate="Dec 3,2024"
          id="1"
        /> */}
      </div>
    </>
  );
}
