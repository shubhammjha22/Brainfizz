import { useState } from "react";
import DropDown from "./DropDown";

export default function NavLogo({}) {
  const [visible, setVisible] = useState(false);
  function handleOption() {
    setVisible((prev) => !prev);
  }

  const name = localStorage.getItem("name");
  //   console.log(name);

  return (
    <>
      <div className=" bg-slate-300 h-6 w-6 md:h-10 md:w-10 rounded-full ml-4">
        <button
          onClick={handleOption}
          //   onBlur={() => {
          //     setVisible(false);
          //   }}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="relative flex items-center justify-center w-full h-full text-md md:text-xl font-semibold"
        >
          {name ? `${name[0]}` : "G"}
        </button>
        {visible ? <DropDown /> : ""}
      </div>
    </>
  );
}
