import React, { useEffect, useState, useRef, useContext } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose, GrClose } from "react-icons/gr";
import  { AiOutlineClose } from "react-icons/ai";
import { curtainSearchSwitching } from "../Navbar";

type Props = {}

const SearchBar = (props: Props) => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState<"submit" | "button" | "reset" | undefined>(global.innerWidth < 935 ? "button" : "submit");
  const [isResponsiveOn, setIsResponsiveOn] = useState(global.innerWidth < 935 ? true : false);
  const searchRef = useRef<any>();
  const searchInputRef = useRef<any>();
  
  const {isSearchToggled, setIsSearchToggled, isCurtainOpen, setIsCurtainOpen} = useContext(curtainSearchSwitching);

  useEffect(() => {
    const closeBtn =  document.getElementById("close-btn");

    if(isCurtainOpen && isSearchToggled) {
      if(closeBtn != undefined) {
        closeBtn.click();
      }
      setIsSearchToggled(!isSearchToggled);
    }

  }, [isCurtainOpen])

  // Convert Search button to open search instead of submit
  useEffect(() => {

    if(isResponsiveOn) {
      searchRef.current.style.cursor = "initial";
      searchInputRef.current.style.top = "-50px";
      setIsDisabled(false);
      setType("button");
    } else {
      setType("submit");
      const closeBtn =  document.getElementById("close-btn");
      if(closeBtn != undefined)
        closeBtn.click();
      searchInputRef.current.style.top = "initial";
      searchInputRef.current.style.display = "initial";
      searchRef.current.style.display = "initial";
      if(isSearchToggled) {
        if(closeBtn != undefined)
          closeBtn.click();
      }
    }
    
  }, [isResponsiveOn])

  // Disable/Enable submission if searchbar is empty
  useEffect(() => {
    if(!isResponsiveOn && searchValue === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [searchValue])

  
  function disableCursor() {
    if(!isResponsiveOn || (searchInputRef.current.style.top === "-50px" && isResponsiveOn && type !== "button")) {
      if(searchValue == "") {
        searchRef.current.style.cursor = "not-allowed";
      } else {
        searchRef.current.style.cursor = "initial";
      }
    } else {
      searchRef.current.style.cursor = "initial";
    }
  }

  global.onresize = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  global.onload = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  function toggleSearchInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    if(isDisabled && !isResponsiveOn) {
      searchInputRef.current.style.display = "initial";
      return;
    }

    const closeBtn = document.getElementById("close-btn");
    setIsSearchToggled(!isSearchToggled);

    if(isResponsiveOn) {
      if(type === "submit") {
        if(searchValue === "") {
          // setIsDisabled(true);
          e.preventDefault();
        } else {
          setIsDisabled(false);
        }
      } else {
        searchInputRef.current.style.display = "initial";
        searchInputRef.current.style.top = "85px";
        searchInputRef.current.style.transition = "top 1s";
        searchRef.current.style.display = "none";
        if(closeBtn != undefined) {
          closeBtn.style.display = "initial";
        }

        setType("submit");
        e.preventDefault();
      }
    } else {
      if(searchValue === "") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }

  function closeSearch() {
    if(isResponsiveOn) {
      if(searchInputRef != undefined)
        searchInputRef.current.style.top = "-50px";

      searchRef.current.style.display = "initial";
    }

    setIsSearchToggled(false);
    setType("button");

    const closeBtn = document.getElementById("close-btn");

    if(closeBtn != undefined)
      closeBtn.style.display = "none";
  }

  return (
    <form className='flex items-center w-full'>
        <input ref={searchInputRef} id='search-value' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='rounded-full transition-outline-width duration-200 nv-max:absolute relative max-w-lg nv-max:w-11/12 nv-max:mx-auto text-white nv-max:left-0 nv-max:right-0 w-96 h-8 pl-2.5 bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 focus:outline focus:outline-2 outline-searchFocus' placeholder='Search for anything'/>
        <button type='button' id='close-btn' onClick={closeSearch}  className='absolute text-red-500 hidden scale-150 right-26 top-6 hover:scale-155 hover:cursor-pointer transition-transform duration-300' ><AiOutlineClose /></button>
        <button ref={searchRef} id='submit-search-btn' className='rounded-full nv-max:absolute nv-max:right-24 nv-max:bg-white bg-navlink-bg p-2 relative right-8' type={type} disabled={isDisabled} onMouseOver={disableCursor} onClick={(e) => toggleSearchInput(e)}>
            <BiSearchAlt2 className='text-white nv-max:text-navlink-bg scale-150 hover:scale-160 transition-all duration-200 rotate-90' />
        </button>
    </form>
  )
}

export default SearchBar;