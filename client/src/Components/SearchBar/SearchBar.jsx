import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEventByName } from "../../Redux/Slices/Event/eventActions";

function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSearch(e) {
        e.preventDefault();
        if (e.key === "Enter" && name !== "") {
            dispatch(getEventByName(name));
            setName("");
        }
    }

    function handleSearchButton(e) {
        e.preventDefault();
        // if (name !== ("") ) {
        dispatch(getEventByName(name));
        setName("");
        // }
    }

    return (
        <div className="h-10 w-96 px-2 flex flex-row-reverse bg-customGray border border-white rounded-lg items-center">
            <img
                onClick={(e) => handleSearchButton(e)}
                onChange={(e) => handleInput(e)}
                className="h-3/4"
                src={
                    "https://res.cloudinary.com/ds41xxspf/image/upload/v1668097753/Donde-Suena-Assets/Henry_Proyecto_Grupal_Buscar_vx1rgr.png"
                }
                alt="search icon"
            />
            <input
                onChange={(e) => handleInput(e)}
                onKeyUp={(e) => handleSearch(e)}
                value={name}
                className="bg-customGray p-4 h-full w-full focus:outline-0 focus:text-white"
                type="text"
                placeholder="Search..."
            />
        </div>
    );
}

export default SearchBar;
