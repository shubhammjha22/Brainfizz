import NavBar from "../components/NavBar";

export default function ErrorPage() {
  return (
    <>
      <NavBar writeMode={false} />
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-5xl font-bold ">Oops ! Some Error</h1>
      </div>
    </>
  );
}
