import React, { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from "next/router";
import DataContext from "../../../../context/DataContext";
import { BiSearchAlt2 } from "react-icons/bi";
import  { IoMdClose } from "react-icons/io";
import { curtainSearchSwitching } from "../Navbar";

type Props = {}

const SearchBar = (props: Props) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const searchInputRef = useRef<any>();
    const submitSearchRef = useRef<any>();
    const closeButtonRef = useRef<any>();
    const responsiveSearchButtonRef = useRef<any>();

    const { SetFilter } = useContext(DataContext);
    const { setIsSearchOpen, isCurtainOpen } = useContext(curtainSearchSwitching);

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
        isCurtainOpen ? closeSearch(): null;
    },[isCurtainOpen])

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        SetFilter((prev) => {
            return {
            ...prev,
            Keyword: [searchValue],
            Page: 1,
            };
        });

        e.preventDefault();
    }

    const setDisableAndValue = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        
        (e.target.value === "") ? setIsDisabled(true): setIsDisabled(false);
        
        setSearchValue(e.target.value);
    }

    function checkEmptySearch() {

        (isDisabled) ? submitSearchRef.current.classList.add("cursor-not-allowed"): submitSearchRef.current.classList.remove("cursor-not-allowed");
    
    }

    function openSearch() {
        
        searchInputRef.current.classList.remove("nv-max:top-[-50px]");
        searchInputRef.current.classList.add("nv-max:top-22");

        responsiveSearchButtonRef.current.classList.add("hidden");

        closeButtonRef.current.classList.remove("z-behind");

        setIsSearchOpen(true);
    }

    function closeSearch() {
        
        searchInputRef.current.classList.add("nv-max:top-[-50px]");
        searchInputRef.current.classList.remove("nv-max:top-22");

        responsiveSearchButtonRef.current.classList.remove("hidden");

        closeButtonRef.current.classList.add("z-1");

        setIsSearchOpen(false);
    }

  return (
    <form className='flex items-center w-full z-40'>

        <div ref={searchInputRef} className='nv-max:absolute z-20 flex relative nv-max:top-[-50px] nv-max:left-0 nv-max:right-0 max-w-lg nv-max:w-11/12 nv-max:mx-auto transition-all duration-1000'>
            <input value={searchValue} onChange={setDisableAndValue} placeholder='Search for anything' className='rounded-full w-96 h-8 pl-2.5 nv-max:ml-12 text-white bg-navlink-bg placeholder:italic placeholder:text-sm placeholder-white tracking-wide placeholder-opacity-70 focus:outline focus:outline-2 outline-searchFocus'/>
            <button type='submit' ref={submitSearchRef} disabled={isDisabled} onClick={submit} onMouseOver={checkEmptySearch} className='rounded-full bg-navlink-bg text-white p-2 align-top relative right-8'>
                <BiSearchAlt2 className='scale-150 hover:scale-160' />
            </button>
        </div>

        <button type='button' onClick={closeSearch} ref={closeButtonRef} className='absolute text-white rounded-full nv:hidden nv-max:bg-red-500 p-2 right-24 top-4 hover:cursor-pointer transition-transform duration-300' >
            <IoMdClose className='scale-150 hover:scale-160' />
        </button>
        <button type='button' ref={responsiveSearchButtonRef} onClick={openSearch} className='rounded-full nv:hidden nv-max:absolute text-navlink-bg bg-white p-2 nv-max:right-24 relative right-8'>
            <BiSearchAlt2 className='scale-150 hover:scale-160' />
        </button>

    </form>
  )
}

export default SearchBar;