import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const DashBoardOptionButton = ({ buttonName, activeOption, handleOptionButtonClick }) => {

    let handleBtnClick = useCallback(() => {
        handleOptionButtonClick(buttonName);
    }, [buttonName]);
    
    return (
        <button onClick={handleBtnClick} className={`gap-2.5 py-4 px-3  border-b ${activeOption === buttonName ? " border-black " : "border-transparent"}`} type="button" >
            <h5 className="heading-h5 custom-text-grey900">{buttonName}</h5>
        </button>
    );
};

export default DashBoardOptionButton;

DashBoardOptionButton.propTypes = {
    buttonName: PropTypes.string,
    activeOption: PropTypes.string,
    handleOptionButtonClick: PropTypes.func,
};
