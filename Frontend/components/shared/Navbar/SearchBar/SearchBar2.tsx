import React, { useEffect, useState, useRef, useContext } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { GrFormClose, GrClose } from "react-icons/gr";
import  { IoMdClose } from "react-icons/io";
import { curtainSearchSwitching } from "../Navbar";

type Props = {}

const SearchBar2 = (props: Props) => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const searchButtonClassName = 'text-white nv-max:text-navlink-bg scale-150 hover:scale-160 transition-all duration-200 rotate-90';
  const [buttonIcon, setButtonIcon] = useState(<BiSearchAlt2 className={searchButtonClassName} />);
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const [type, setType] = useState<'submit' | 'button' | 'reset' | undefined>(global.innerWidth < 935 ? 'button' : 'submit');
  const [isResponsiveOn, setIsResponsiveOn] = useState(global.innerWidth < 935 ? true : false);
  const searchRef = useRef<any>();
  const searchInputRef = useRef<any>();
  
  global.onresize = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  global.onload = () => {
    setIsResponsiveOn(global.innerWidth < 935 ? true : false);
    setType(global.innerWidth < 935 ? "button" : "submit");
  }

  useEffect(() => {

    if(!isResponsiveOn) {
        setType("submit");
        searchValue === "" ? setIsDisabled(true):setIsDisabled(false);
        searchInputRef.current.style.top = "initial";
    } else {
        setType("button");
        setIsDisabled(false);

        searchInputRef.current.style.top = "-50px";
    }

  }, [isResponsiveOn])

  function submitOrToggle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if(!isResponsiveOn /*submit*/) {
        // Submit, in other words do nothing
    } else /*toggle*/{
        if(!isSearchToggled) /*open*/ {
            searchInputRef.current.style.top = "85px";
            setButtonIcon(<IoMdClose className={searchButtonClassName} />);
            setType("submit");
            setIsSearchToggled(!isSearchToggled);
        } else if(isSearchToggled) /*close or submit*/ {
            if(searchValue === "") {
                searchInputRef.current.style.top = "-50px";
                setButtonIcon(<BiSearchAlt2 className={searchButtonClassName} />);
                setType("button");
            } else {
                setType("submit");
                setIsSearchToggled(!isSearchToggled);
            }
        }

        e.preventDefault();
    }
  }

  function checkLock(e: { target: { value: React.SetStateAction<string>; }; }) {
    if(!isResponsiveOn) {
        if(e.target.value === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    } else {
        if(type === "submit") {
            if(e.target.value === "") {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }
        } else if(type === "button") {
            setIsDisabled(false);
        }
    }

    setSearchValue(e.target.value);
  }

  function checkEmptySearch() {
    if(isDisabled) {
        searchRef.current.style.cursor = "not-allowed";
    } else {
        searchRef.current.style.cursor = "pointer";
    }
  }

  return (
    <form className='flex items-center w-full'>
        <input id='search-value' ref={searchInputRef} value={searchValue} onChange={(e) => checkLock(e)} placeholder='Search for anything' className='rounded-full transition-all duration-1000 nv-max:absolute relative max-w-lg nv-max:w-11/12 nv-max:mx-auto text-white nv-max:left-0 nv-max:right-0 w-96 h-8 pl-2.5 bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 focus:outline focus:outline-2 outline-searchFocus'/>
        <button id='close-btn' type='button' className='absolute text-white rounded-full nv-max:bg-red-500 hidden scale-150 right-26 top-6 hover:scale-160 hover:cursor-pointer transition-transform duration-300' ><IoMdClose /></button>
        <button id='submit-search-btn' ref={searchRef} type={type} disabled={isDisabled} onClick={(e) => submitOrToggle(e)} onMouseOver={checkEmptySearch} className='rounded-full nv-max:right-0 nv-max:bg-green-600 bg-navlink-bg p-2 relative right-8'>
            {buttonIcon}
        </button>
    </form>
  )
}

export default SearchBar2;