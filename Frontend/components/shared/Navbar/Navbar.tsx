import { type } from "os";
import React, { useRef, useState, useEffect, createContext, useCallback } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import BurgerButton from "./BurgerButton/BurgerButton";

interface ContextState {
    isCurtainOpen: any,
    setIsCurtainOpen: any,
    isSearchToggled: any, 
    setIsSearchToggled: any
}

const curtainSearchSwitching = createContext({} as ContextState);

function Navbar() {

    const curtainRef = useRef<any>();
    const [isCurtainOpen, setIsCurtainOpen] = useState(false);
    const [isSearchToggled, setIsSearchToggled] = useState(false);
    const [isResponsiveOn, setIsResponsiveOn] = useState(global.innerWidth < 935 ? true : false);


    function autoMove(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        
        const movableHover = document.getElementById("movable-hover");
        
        if(movableHover != undefined) {
            movableHover.style.display = "initial";
            movableHover.style.left = e.currentTarget.offsetLeft.toString() + "px";
            movableHover.style.top = (e.currentTarget.offsetTop + 9).toString() + "px";
            movableHover.style.width = e.currentTarget.offsetWidth.toString() + "px";
            movableHover.style.height = (e.currentTarget.offsetHeight - 20).toString() + "px";
        }
    }

    function hide() {

        const movableHover = document.getElementById("movable-hover");

        if(movableHover != undefined) {
            movableHover.style.left = "initial";
            movableHover.style.display = "none";
        }
    }

    function toggleCurtain() {
        if(curtainRef != undefined) {
            if(!isCurtainOpen) {
                curtainRef.current.style.bottom = "-104px";
                curtainRef.current.style.opacity = "100%";
            } else {
                curtainRef.current.style.bottom = "9rem";
                curtainRef.current.style.opacity = "0%";
            }
        }
        setIsCurtainOpen(!isCurtainOpen);
    }

    const [windowSize, setWindowSize] = useState(global.innerWidth);

    const handleWindowResize = useCallback(() => {
        setWindowSize(global.innerWidth);
    }, []); 
  
  
    useEffect(() => {
      global.addEventListener('resize', handleWindowResize);
  
      return () => {
        global.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    useEffect(() => {
        windowSize < 935 ? "" : curtainRef.current.style.opacity = "100%";
    }, [windowSize])

    return (
        <curtainSearchSwitching.Provider value={{isSearchToggled, setIsSearchToggled, isCurtainOpen, setIsCurtainOpen}} >
            <div className="flex justify-between items-center nv:px-2 h-16 drop-shadow-lg shadow-lg bg-navbar">
                <div className="nv-max:absolute z-behind flex bg-navbar">
                    <img className="h-16 min-w-fit py-2 px-6" src="images/Expecto Patronum (White).png" />
                </div>
                <div className="flex items-center">
                    <div className="z-20">
                        <SearchBar />
                        <BurgerButton toggle={toggleCurtain} />
                    </div>
                    <div ref={curtainRef} className="nv-max:relative z-10 transition-navbar-anime duration-1000 nv-max:bottom-36 nv-max:w-screen nv-max:bg-navbar" onMouseLeave={hide} onClick={toggleCurtain} >
                        <a className="text-navlink py-3 px-4 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Services</a>
                        <a className="text-navlink py-3 px-4 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Log in</a>
                        <a className="text-navlink py-3 px-4 whitespace-nowrap z-10 relative nv-max:block transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Sign up</a>
                        <div id="movable-hover" className="absolute hidden right-0 z-last transition-all nv:z-behind nv-max:z-0 duration-200 bg-navlink-bg h-6 px-4 py-2 rounded-full"></div>
                    </div>
                </div>
            </div>
        </curtainSearchSwitching.Provider>
    );
}

export default Navbar;
export { curtainSearchSwitching };