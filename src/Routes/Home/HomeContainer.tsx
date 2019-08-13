import React, { useState } from "react";
import HomePresenter from "./HomePresenter";

export default ({history}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {

        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            <HomePresenter
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
        </div>
    );
};