import React, { useRef, useState, createContext } from "react";
import classNames from "classnames";
import { AiOutlineUser } from "react-icons/ai";
import SearchBar from "./SearchBar/SearchBar";
import BurgerButton from "./BurgerButton/BurgerButton";
import SelectCountry from "./SelectCountry/SelectCountry";

interface ContextState {
  isCurtainOpen: any;
  setIsCurtainOpen: any;
  isSearchOpen: any;
  setIsSearchOpen: any;
}

const curtainSearchSwitching = createContext({} as ContextState);

function Navbar() {
  const curtainRef = useRef<any>();
  const parentRef = useRef<any>();
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <curtainSearchSwitching.Provider
      value={{ isSearchOpen, setIsSearchOpen, isCurtainOpen, setIsCurtainOpen }}
    >
      <div ref={parentRef} className={navbar}>
        <a href="/" className={navLogoDiv}>
          <img className={navLogo} src="/images/logo.png" />
        </a>

        <div className="flex">
          <SearchBar />
          <div ref={curtainRef} className={navContentDiv}>
            <a className={navLink} href="/Instructor">
              Inspire Learners
            </a>
            <hr className="nv:hidden" />
            <a className={navWideButton} href="">
              Sign Up
            </a>
          </div>
          <div className={navIconsDiv}>
            <a className={navButton} href="">
              <AiOutlineUser className={navButtonIcon} />
            </a>
            <SelectCountry />
            <BurgerButton curtainRef={curtainRef} />
          </div>
        </div>
      </div>
    </curtainSearchSwitching.Provider>
  );
}

const navbar = classNames(
  "relative z-50 flex justify-between items-center nv:px-2 h-16 py-10 shadow-sm"
);
const navLogoDiv = classNames(
  "nv-max:absolute z-behind 1030:overflow-hidden 1030:w-[3.75rem] transition-all duration-300"
);
const navLogo = classNames("h-20 w-fit min-w-fit");
const navContentDiv = classNames(
  "nv-max:absolute z-50 h-full mob:w-screen nv-max-mob:w-fullscreen nv-max:block nv-max:p-2 flex items-center transition-navbar-anime duration-1000 nv-max:bottom-20 nv-max:left-0 nv-max:bg-main "
);
const navIconsDiv = classNames(
  "flex items-center nv-max:absolute nv-max:w-fit right-5 bottom-3.5 h-13"
);
const navLink = classNames(
  "navbar-link text-sm nv-max:text-lg pt-px nv-max:hover:text-canadian-red h-fit nv-max:top-8 nv:top-2.5 rounded-full border-black w-fit mr-6 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300 after:content-[''] after:absolute after:-bottom-px after:left-0 after:w-full after:h-0.5 after:bg-canadian-red after:transition-all after:duration-500 hover:after:opacity-100 after:opacity-100 after:scale-0 after:origin-center hover:after:scale-100 items-center justify-center block"
);
const navWideButton = classNames(
  "navbar-link nv-max:text-lg border-1.5 w-fit nv-max:relative nv-max:bottom-8 nv:top-2.5 border-canadian-red nv-max:border-0 nv-max:bg-transparent nv-max:text-canadian-red bg-canadian-red hover:bg-transparent text-white text-sm pt-px rounded-full hover:text-canadian-red nv:mx-2 nv:h-8 nv:px-6 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300 flex items-center justify-center nv-max:after:content-[''] nv-max:after:absolute nv-max:after:-bottom-px nv-max:after:left-0 nv-max:after:w-full nv-max:after:h-0.5 nv-max:after:bg-canadian-red nv-max:after:transition-all nv-max:after:duration-500 nv-max:hover:after:opacity-100 nv-max:after:opacity-100 nv-max:after:scale-0 nv-max:after:origin-center nv-max:hover:after:scale-100  nv-max:items-center "
);
const navButton = classNames(
  "navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 relative transition-all duration-300 flex items-center justify-center"
);
const navButtonIcon = classNames("scale-110 pointer-events-none");

export default Navbar;
export { curtainSearchSwitching };
