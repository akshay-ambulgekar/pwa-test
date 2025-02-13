'use client';
import React from "react";
import PropTypes from 'prop-types';

const DashBoardGridButton = ({ buttonName, buttonData, isGridButtonActive, setIsGridButtonActive }) => {

    const handleGridButtons = (name) => {

        setIsGridButtonActive((prev) => (prev === name ? '' : name));   // Toggle the active state
    };

    const handleGridButtonClick = (name) => () => handleGridButtons(name);

    return (
        <button onClick={handleGridButtonClick(buttonName)} className={`border custom-border-grey300 gap-3 p-5 rounded-xl flex flex-col ${isGridButtonActive === buttonName ? "custom-border-blue-sapphire background-custom-alice-blue" : ""}`} type="button" >
            <h5 className="heading-h5 custom-text-grey900 text-left ">{buttonName}</h5>
            <h1 className="heading-h1 custom-text-grey900 text-left ">{buttonData}</h1>
        </button>
    );
};

export default DashBoardGridButton;

DashBoardGridButton.propTypes = {
    buttonName:PropTypes.string,
    buttonData:PropTypes.any,
    isGridButtonActive:PropTypes.any,
    setIsGridButtonActive:PropTypes.any,
};
