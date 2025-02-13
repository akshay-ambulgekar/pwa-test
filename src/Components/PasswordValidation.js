'use client';
import Image from 'next/image';


import Cross from '@/Images/SignUp/cross-round-icon.svg';
import Check from '@/Images/SignUp/check-round-icon.svg';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

    

function PasswordValidationBoxes({password})
{
    let[charactersLengthValidation,setCharactersLengthValidation]=useState(false);
    let[oneNumberValidation,setOneNumberValidation]=useState(false);
    let[oneUpperCaseLetterValidation,setOneUpperCaseLetterValidation]=useState(false);
    let[oneSpecialLetterValidation,setOneSpecialLetterValidation]=useState(false);

    function validatePassword()
    {

        const hasNumber = /[0-9]/; // At least one number
        const hasUppercase = /[A-Z]/; // At least one uppercase letter
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    
        setCharactersLengthValidation(password.length>=8);               //password length should be 8
        setOneNumberValidation(hasNumber.test(password));               //password contains At least one number
        setOneUpperCaseLetterValidation(hasUppercase.test(password));    //password contains At least uppercase letter
        setOneSpecialLetterValidation(hasSpecialChar.test(password));    //password contains At least special character
        

    }


    useEffect(()=>{
        validatePassword();
    },[password]);       //whenever the password changed this function will be called
   
    return(
        <>
            <div className={"grid grid-cols-2 gap-y-3 gap-x-2 "}>
                <div className="flex gap-2">
                    <Image src={charactersLengthValidation?Check:Cross} width={20} height={20} alt='img' quality={100} className='' />
                    <div className="custom-text-grey600 body-sm">8 characters minimum</div>
                </div>
                <div className="flex gap-2">
                    <Image src={oneNumberValidation?Check:Cross} width={20} height={20} alt='img' quality={100} className='' />
                    <div className="custom-text-grey600 body-sm">One number</div>
                </div>
                <div className="flex gap-2">
                    <Image src={oneUpperCaseLetterValidation?Check:Cross} width={20} height={20} alt='img' quality={100} className='' />
                    <div className="custom-text-grey600 body-sm">One uppercase letter</div>
                </div>
                <div className="flex gap-2">
                    <Image src={oneSpecialLetterValidation?Check:Cross} width={20} height={20} alt='img' quality={100} className='' />
                    <div className="custom-text-grey600 body-sm">One special character</div>
                </div>
            </div>
        </>
    );
}

export default PasswordValidationBoxes;


function verifyPasswordIsMatchingToCriteriaWhileTyping(password)
{
    const hasNumber = /[0-9]/; // At least one number
    const hasUppercase = /[A-Z]/; // At least one uppercase letter
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    
    return password.length<8 || !hasNumber.test(password) || !hasUppercase.test(password) || !hasSpecialChar.test(password);   
}

export {verifyPasswordIsMatchingToCriteriaWhileTyping};


PasswordValidationBoxes.propTypes={
    password:PropTypes.any,
  };