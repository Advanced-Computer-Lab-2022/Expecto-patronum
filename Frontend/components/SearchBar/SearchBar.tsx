import React, { useEffect, useState, useRef } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {}

const SearchBar = (props: Props) => {

  const [isEmpty, setIsEmpty] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState<"submit" | "button" | "reset" | undefined>(global.innerWidth < 935 ? "button" : "submit");
  const [isResponsiveOn, setIsResponsiveOn] = useState(global.innerWidth < 935 ? true : false);
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const searchRef = useRef<any>();
  const searchInputRef = useRef<any>();

  useEffect(() => {

    if(type === "submit") {
      if(searchRef !== undefined) {
        if(searchValue === "") {
          setIsEmpty(true);
          searchInputRef.current.style.display = "initial";
          searchInputRef.current.style.left = "0px";
          searchInputRef.current.style.top = "0px";
          searchRef.current.style.cursor = "not-allowed";
        }
        else {
          setIsEmpty(false);
          searchInputRef.current.style.display = "none";
          searchInputRef.current.style.top = "65px";
          searchRef.current.style.cursor = "initial";
        }
      }
    } else {
      setIsEmpty(false);
      searchInputRef.current.style.display = "none";
      searchInputRef.current.style.top = "65px";
      searchRef.current.style.cursor = "initial";
    }

    
  }, [searchValue, type])

  global.onresize = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  global.onload = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  function toggleSearchBar(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if(isResponsiveOn) {
      if(!isSearchToggled) {
        searchInputRef.current.style.display = "initial";
        searchInputRef.current.style.top = "65px";
        setIsSearchToggled(!isSearchToggled);
      } else {
        searchInputRef.current.style.display = "none";
        searchInputRef.current.style.left = "0px";
        searchInputRef.current.style.top = "0px";
        setIsSearchToggled(!isSearchToggled);
      }
      
      e.preventDefault();
    }
  }

  return (
    <form className='flex items-center w-full'>
        <input ref={searchInputRef} id='search-value' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='rounded-full nv-max:absolute relative nv-max:hidden max-w-lg nv-max:w-11/12 nv-max:mx-auto text-white nv-max:left-0 nv-max:right-0 w-96 h-8 pl-2.5 bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 transition-outline-width duration-200 focus:outline focus:outline-2 outline-searchFocus' placeholder='Search for anything'/>
        <button ref={searchRef} id='submit-search-btn' className='rounded-full nv-max:absolute nv-max:right-24 nv-max:bg-white bg-navlink-bg p-2 relative right-8' type={type} disabled={isEmpty} onClick={(e) => toggleSearchBar(e)}>
            <BiSearchAlt2 className='text-white nv-max:text-navlink-bg scale-150 hover:scale-160 transition-all duration-200 rotate-90' />
        </button>
    </form>
  )
}

export default SearchBar;