import React, { useRef, useState, createContext } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar/SearchBar";
import BurgerButton from "./BurgerButton/BurgerButton";
import CountryPicker from "../../CountryPicker/CountryPicker";

interface ContextState {
    isCurtainOpen: any,
    setIsCurtainOpen: any,
    isSearchOpen: any, 
    setIsSearchOpen: any
}

const curtainSearchSwitching = createContext({} as ContextState);

function Navbar() {
    
    const curtainRef = useRef<any>();
    const parentRef = useRef<any>();
    const hoverRef = useRef<any>();
    const [isCurtainOpen, setIsCurtainOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const autoMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        hoverRef.current.style.display = "initial";
        hoverRef.current.style.width = e.currentTarget.offsetWidth + "px";
        hoverRef.current.style.height = (e.currentTarget.offsetHeight - 18) + "px";
        hoverRef.current.style.top = (e.currentTarget.offsetTop + 9) + "px";
        hoverRef.current.style.left = e.currentTarget.offsetLeft + "px";
    }

    function hide() {
        hoverRef.current.style.display = "none";
        hoverRef.current.style.left = "initial";
    }

    return (
        <curtainSearchSwitching.Provider value={{isSearchOpen, setIsSearchOpen, isCurtainOpen, setIsCurtainOpen}} >
            <div ref={parentRef} className="relative z-50 flex justify-between items-center nv:px-2 h-16 drop-shadow-lg shadow-lg bg-navbar">
                <div className="nv-max:absolute z-behind flex bg-navbar">
                    <img className="h-16 w-48 py-2 px-6 mob:hidden" src="/images/Expecto Patronum (White).png" />
                </div>

                <div className="flex h-16 items-center">
                    <div className="z-20 flex">
                        <CountryPicker />
                        <SearchBar />
                        <BurgerButton curtainRef={curtainRef} />
                    </div>
    
                    <div ref={curtainRef} className="mob:w-screen nv-max-mob:w-fullscreen nv-max:relative z-10 transition-navbar-anime duration-1000 nv-max:bottom-36 nv-max:bg-navbar" onMouseLeave={hide}>
                        <a className="navbar-link text-navlink py-3 px-4 nv-max:mx-1 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={autoMove}>Services</a>
                        <a className="navbar-link text-navlink py-3 px-4 nv-max:mx-1 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={autoMove}>Log in</a>
                        <a className="navbar-link text-navlink py-3 px-4 nv-max:mx-1 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={autoMove}>Sign up</a>
                        <div ref={hoverRef} id="movable-hover" className="absolute hidden right-0 z-last transition-all nv:z-behind nv-max:z-0 duration-200 bg-navlink-bg h-6 px-4 py-1 rounded-full"></div>
                    </div>
                </div>
            </div>
        </curtainSearchSwitching.Provider>
    );
}

export default Navbar;
export { curtainSearchSwitching };