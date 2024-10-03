import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const transition = "transition-all duration-300";

const animatedIcon = `
  p-1
  absolute 
  top-auto 
  left-auto 
  right-auto
  bottom-auto 
  ${transition}
  text-[#E8E8E8]
  hover:text-white
`;

const hiddenYAnimation = `${animatedIcon} translate-y-full`;
const hiddenXAnimation = `${animatedIcon} translate-x-full`;
const visibleAnimation = `${animatedIcon} !translate-y-0 !translate-x-0`;

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenClose = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <button
      className="
        p-1
        flex
        w-10
        h-10
        relative
        items-center
        justify-center
        overflow-hidden
        min-w-10
        min-h-10
      "
      onClick={toggleOpenClose}
    >
      <MdClose
        size={40}
        className={`${isOpen ? hiddenYAnimation : visibleAnimation}`}
      />
      <GiHamburgerMenu
        size={40}
        className={`${isOpen ? visibleAnimation : hiddenXAnimation}`}
      />
    </button>
  );
};
