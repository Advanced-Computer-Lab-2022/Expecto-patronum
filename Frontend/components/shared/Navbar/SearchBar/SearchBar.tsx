import React, { useEffect, useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import DataContext from "../../../../context/DataContext";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { curtainSearchSwitching } from "../Navbar";
import classNames from "classnames";

type Props = {};

const SearchBar = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef<any>();
  const searchInputRef = useRef<any>();
  const submitSearchRef = useRef<any>();
  const closeButtonRef = useRef<any>();

  const { SetFilter } = useContext(DataContext);
  const { isSearchOpen, setIsSearchOpen, isCurtainOpen } = useContext(curtainSearchSwitching);

  const router = useRouter();

  useEffect(() => {
    if (searchValue === "" && router.query.keyword) {
      if (typeof router.query.keyword !== "object") {
        setSearchValue(router.query.keyword);
        setIsDisabled(false);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    isCurtainOpen ? closeSearch() : null;
  }, [isCurtainOpen]);

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    SetFilter((prev) => {
      return {
        ...prev,
        Keyword: [searchValue],
        Page: 1,
      };
    });

    if (router.pathname !== "/Courses") {
      router.push("/Courses?keyword=" + searchValue);
    }

    // if (router.query.search) {
    //   router.query.search = searchValue;
    // } else {
    //   if (
    //     router.query.subject ||
    //     router.query.price ||
    //     router.query.rating
    //   ) {
    //     router.push(router.asPath + "&keyword=" + searchValue);
    //   } else {
    //     router.push(router.asPath + "?keyword=" + searchValue);
    //   }
    // }
    // e.preventDefault();
  };

  const setDisableAndValue = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchValue(e.target.value);
    e.target.value === "" ? setIsDisabled(true) : setIsDisabled(false);
  };

  function checkEmptySearch() {
    isDisabled ? submitSearchRef.current.classList.add("cursor-not-allowed") : submitSearchRef.current.classList.remove("cursor-not-allowed");
  }

  function closeSearch() {
    setIsSearchOpen(false);

    searchRef.current.classList.add("nv-max:w-0");
    searchRef.current.classList.remove("nv-max:w-fullscreen");
  }

  function toggleSearch() {
    !isSearchOpen ? searchInputRef.current.focus() : null;

    setIsSearchOpen(!isSearchOpen);

    searchRef.current.classList.toggle("nv-max:w-0");
    searchRef.current.classList.toggle("mob:w-screen");
    searchRef.current.classList.toggle("nv-max-mob:w-fullscreen");
    searchRef.current.classList.toggle("z-50");

    closeButtonRef.current.classList.toggle("nv-max:right-2");
  }

  return (
    <form className={search}>
      <div ref={searchRef} className={searchInputDiv}>
        <input ref={searchInputRef} value={searchValue} onChange={setDisableAndValue} placeholder="Search for anything" className={searchInput} />
        <button type="submit" ref={submitSearchRef} disabled={isDisabled} onClick={submit} onMouseOver={checkEmptySearch} className={searchButton}>
          <BiSearchAlt2 />
        </button>
      </div>

      <button type="button" onClick={toggleSearch} ref={closeButtonRef} className={toggleSearchButton}>
        {isSearchOpen ? <IoMdClose className={buttonIcon} /> : <BiSearchAlt2 className={buttonIcon} />}
      </button>
    </form>
  );
};

const search = classNames("flex items-center z-40");
const searchInputDiv = classNames("nv-max:absolute z-behind flex relative nv-max:h-full nv-max:w-0 nv-max:right-0 nv-max:overflow-hidden nv-max:mx-auto transition-all duration-300");
const searchInput = classNames("rounded-full w-64 h-8 nv-max:h-full mob:w-screen nv-max-mob:w-fullscreen nv-max:absolute nv-max:pr-3 bg-main nv-max:right-0 pl-2.5 pr-8 nv-max:rounded-none border-1.5 nv-max:border-gray-300 border-black placeholder:italic placeholder:text-sm bg-transparent tracking-wide focus:outline-0 transition-all duration-300");
const searchButton = classNames("rounded-full p-2 align-top relative right-8 transition-all duration-200 scale-125 hover:scale-135 nv-max:hidden");
const toggleSearchButton = classNames("absolute text-white rounded-full nv:hidden nv-max:bg-canadian-red hover:scale-110 nv-max:hover:text-canadian-red nv-max:hover:bg-main border-1.5 border-canadian-red h-8 w-8 right-64 top-6 z-50 hover:cursor-pointer transition-all duration-300");
const buttonIcon = classNames("scale-135 pointer-events-none ml-1.5");

export default SearchBar;
