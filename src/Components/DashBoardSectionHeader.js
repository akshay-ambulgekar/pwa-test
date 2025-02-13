import React from "react";
import PropTypes from 'prop-types';

const DashBoardSectionHeader = ({ heading, fromDate, toDate }) => {
  return (
    <div className=" gap-1">
      <h3 className="heading-h3 custom-text-grey950 "> {heading}</h3>
      <span className="body-sm-bold custom-text-grey600 mt-1 ">
        {fromDate} - {toDate}
      </span>
    </div>
  );
};

export default DashBoardSectionHeader;

DashBoardSectionHeader.propTypes = {
  heading: PropTypes.string,
  fromDate: PropTypes.any,
  toDate: PropTypes.any,
};
