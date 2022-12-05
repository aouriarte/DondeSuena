import React, { useState } from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

export const DropdownComment = () => {
    const [dropdown, setDropdown] = useState(false); //si no se toca permanece cerrado
    const openCloseDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <div>
            <Dropdown isOpen={dropdown} toogle={openCloseDropdown}>
                <DropdownToggle>Comentar</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>aca iria form de comentarios </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default DropdownComment;
