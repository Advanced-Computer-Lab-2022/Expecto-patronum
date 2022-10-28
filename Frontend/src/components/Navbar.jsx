import React from "react";
import NavbarButtons from "./NavbarButtons";

function Navbar() {

    const navStyle = {
        backgroundColor: "white",
        padding: "10px 0px",
    }

    const logoStyle = {
        height: "40px",
        width: "40px",
        marginLeft: "10px",
    }

    return (
        <div style={navStyle}>
            <img style={logoStyle} src={require("../assets/images/logo.png")} alt="logo" />
            <NavbarButtons text="About Us" />
            <NavbarButtons text="Sign In" />
        </div>
    );
}

export default Navbar;