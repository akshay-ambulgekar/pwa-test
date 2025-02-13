import PropTypes from 'prop-types';

function LoadingAnimation({borderColor='custom-border-grey900'})
{
    return(
        <>
            <div className={`w-6 h-6 border-[1.5px] border-b-0 border-r-0 ${borderColor} rounded-full animate-spin`}></div>
        </>
    );
}

export default LoadingAnimation;


LoadingAnimation.propTypes={
    borderColor:PropTypes.string
};