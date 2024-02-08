import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Navigation from "./Navigation";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <HiMenuAlt3
        className="text-3xl cursor-pointer text-gray-500"
        onClick={toggleMenu}
      />
      {isMenuOpen && <Navigation onClose={toggleMenu} />}
    </div>
  );
};

export default BurgerMenu;
