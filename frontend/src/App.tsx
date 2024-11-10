import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import BlogPage from "./pages/BlogPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import BlogFull from "./pages/BlogFull";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="blogs" />, // Redirects "/" to "/blogs"
      },
      {
        path: "blogs",
        element: <BlogPage myBlog={false} />,
      },
      {
        path: "blogs/:id",
        element: <BlogFull />,
      },
      {
        path: "blogs/new",
        element: <BlogCreate />,
      },
      {
        path: "blogs/:id/edit",
        element: <BlogEdit />,
      },

      {
        path: "blogs/myBlogs",
        element: <BlogPage myBlog={true} />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
