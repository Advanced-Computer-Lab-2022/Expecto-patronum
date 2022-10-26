import React from "react";
import SearchBar from "../../SearchBar/SearchBar";

function Navbar() {

    function autoMove(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        
        const movableHover = document.getElementById("movable-hover");
        
        if(movableHover != undefined) {
            movableHover.style.display = "initial";
            movableHover.style.left = e.currentTarget.offsetLeft.toString() + "px";
            movableHover.style.width = e.currentTarget.offsetWidth.toString() + "px";
        }
    }

    function hide() {

        const movableHover = document.getElementById("movable-hover");

        if(movableHover != undefined) {
            movableHover.style.left = "initial";
            movableHover.style.display = "none";
        }
    }

    return (
        <div className="flex justify-between items-center h-16 drop-shadow-lg shadow-lg bg-navbar">
            <div className="flex" >
                <img className="h-20 py-3 px-6" src="images/Expecto Patronum (White).png" />
                <SearchBar />
            </div>
            <div className="pr-14 flex justify-between items-center h-full" onMouseLeave={hide}>
                <a className="text-navlink py-3 px-4 hover:scale-105 transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Services</a>
                <a className="text-navlink py-3 px-4 hover:scale-105 transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Log in</a>
                <a className="text-navlink py-3 px-4 hover:scale-105 transition-all duration-300" href="" onMouseOver={(e) => autoMove(e)}>Sign up</a>
            </div>
            <div id="movable-hover" style={{zIndex: "-1", transition: "all 0.2s"}} className="absolute hidden z-0 bg-navlink-bg h-6 px-4 py-1 rounded-full"></div>
        </div>
    );
}

export default Navbar;