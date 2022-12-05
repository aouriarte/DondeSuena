import React from "react";
import "./Navbar.css";

export default function DropdownItem(props) {
    return (
        <li className="dropdownItem">
            <div className="flex flex-wrap gap-2 cursor-pointer">
                {typeof props.img === "string" ? (
                    <img src={props.img}></img>
                ) : (
                    <div>{props.img}</div>
                )}
                <a className="font-medim"> {props.text} </a>
            </div>
        </li>
    );
}
