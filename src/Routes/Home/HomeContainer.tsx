import React from "react";
import HomePresenter from "./HomePresenter";

export default ({history}) => {

    return (
        <div>
            <HomePresenter
               toggleMenu = {() => ""}
               loading = {false}
               mapRef = {React.createRef()}
            />
        </div>
    );
};