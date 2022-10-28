import React, { useEffect, useState, useRef } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose, GrClose } from "react-icons/gr";
import  { AiOutlineClose } from "react-icons/ai";

type Props = {}

const SearchBar = (props: Props) => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState<"submit" | "button" | "reset" | undefined>(global.innerWidth < 935 ? "button" : "submit");
  const [isResponsiveOn, setIsResponsiveOn] = useState(global.innerWidth < 935 ? true : false);
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const searchRef = useRef<any>();
  const searchInputRef = useRef<any>();

  useEffect(() => {

    if(isResponsiveOn) {
      searchRef.current.style.cursor = "initial";
      searchInputRef.current.style.display = "none";
      setIsDisabled(false);
    } else {
      const closeBtn =  document.getElementById("close-btn");
      if(closeBtn != undefined)
        closeBtn.style.display = "none";
      searchInputRef.current.style.top = "initial";
      searchInputRef.current.style.display = "initial";
    }
    
  }, [isResponsiveOn])

  function disableCursor() {
    if(!isResponsiveOn || (searchInputRef.current.style.display === "initial" && isResponsiveOn)) {
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

    const closeBtn = document.getElementById("close-btn");

    if(type === "button") {
      //View Search Input with Close button
      searchInputRef.current.style.display = "initial";
      searchInputRef.current.style.top = "85px";
      if(closeBtn != undefined) {
        closeBtn.style.display = "initial";
      }

      setType("submit");
      e.preventDefault();
    } else if (!isResponsiveOn && type === "submit"){
      console.log("entered")
      if(searchValue === "") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
      e.preventDefault();
    } 

  }

  function closeSearch() {
    if(searchInputRef != undefined)
      searchInputRef.current.style.display = "none";

    const closeBtn = document.getElementById("close-btn");

    if(closeBtn != undefined)
      closeBtn.style.display = "none";

    setType("button");
  }

  return (
    <form className='flex items-center w-full'>
        <input ref={searchInputRef} id='search-value' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='rounded-full nv-max:absolute relative nv-max:hidden max-w-lg nv-max:w-11/12 nv-max:mx-auto text-white nv-max:left-0 nv-max:right-0 w-96 h-8 pl-2.5 bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 transition-outline-width duration-200 focus:outline focus:outline-2 outline-searchFocus' placeholder='Search for anything'/>
        <AiOutlineClose id='close-btn' className='absolute text-red-500 hidden right-44 top-18 hover:scale-110 hover:cursor-pointer transition-transform duration-300' onClick={closeSearch} />
        <button ref={searchRef} id='submit-search-btn' className='rounded-full nv-max:absolute nv-max:right-24 nv-max:bg-white bg-navlink-bg p-2 relative right-8' type={type} disabled={isDisabled} onMouseOver={disableCursor} onClick={(e) => toggleSearchInput(e)}>
            <BiSearchAlt2 className='text-white nv-max:text-navlink-bg scale-150 hover:scale-160 transition-all duration-200 rotate-90' />
        </button>
    </form>
  )
}

export default SearchBar;