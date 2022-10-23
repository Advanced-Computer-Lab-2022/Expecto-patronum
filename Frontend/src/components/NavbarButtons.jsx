import React, { useState } from 'react';

function NavbarButtons(props) {

    const [isHover, setIsHover] = useState(false);

    const buttonStyle = {
        backgroundColor: "#1D375C",
        color: "#F5F5F5",
        border: "0px",
        padding: "5px",
        float: "right",
    }

    function changeColor(e) {
        if(isHover) {
            e.target.style.backgroundColor = "#1D375C";
        } else {
            e.target.style.backgroundColor = "green";
        }
        setIsHover(!isHover);
    }

    return (
        <button className='rounded-lg shadow-md text-italic p-4' onMouseOver={changeColor} onMouseLeave={changeColor} >
            {props.text}
        </button>
    )
}

export default NavbarButtons;