"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

import { toast } from "sonner";
import Image from "next/image";


//icons
import Checkbox from '@/Images/Icons/checkbox-green.svg';


const PasswordToaster = ({  ...props }) => {
  const { theme = "system" } = useTheme();

  return (

    <Sonner
      theme={theme}
      className="toaster group z-10 fixed sm:top-[80%] sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%]  mb-24 sm:mb-0  text-center"
      toastOptions={{
        // duration: 2000, // Set the duration for the toast to be visible (in milliseconds)
        classNames: {
          toast:
            "group toast group-[.toaster]:border flex justify-center border-[#EBE7E1] group-[.toaster]:bg-[#FFFFFF] py-3 "
        },
      }}
      {...props}
    />
  );
};

export { PasswordToaster };

export default function showPasswordToaster() {

  toast.custom(() => (
    <div className="w-[var(--width)] py-2">
      <div className="gap-2">
        <div className="flex justify-center items-center grow gap-2">
          <Image src={Checkbox} width={16} height={16} alt="img" quality={100} />
          <p className={"all-caps-12 text-center uppercase custom-text-grey900 "}> Password Updated Successfully! </p>
        </div>
      </div>
    </div>
  )
  );
}