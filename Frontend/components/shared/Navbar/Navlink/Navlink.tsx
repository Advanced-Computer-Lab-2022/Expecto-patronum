import Link from "next/link";
import React from "react";

type Props = {
    title: String,
    path: String,
    additionalStyle: String,  //If any
    onHover: Function
};

function Navlink(props: Props) {
    return (
        <a className={"text-navlink px-4 " + props.additionalStyle} href={props.path.toString()} onClick={() => props.onHover}>{props.title}</a>
    );
}

export default Navlink;