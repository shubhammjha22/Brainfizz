import { Quote } from "../components/Quote";
import { SignInForm } from "../components/SignInForm";

export default function SignInPage() {
  return (
    <>
      <div className="flex sm:mt-0 ">
        <div className="w-full  flex justify-center item-center">
          <SignInForm />
        </div>
        <div className="w-full hidden sm:flex justify-center items-center">
          <Quote />
        </div>
      </div>
    </>
  );
}
