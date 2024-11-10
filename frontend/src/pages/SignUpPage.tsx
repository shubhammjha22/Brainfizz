import { Quote } from "../components/Quote";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <div className="w-screen flex ">
        <div className="w-full flex justify-center item-center">
          <SignUpForm />
        </div>
        <div className="w-full hidden sm:flex justify-center items-center">
          <Quote />
        </div>
      </div>
    </>
  );
}
