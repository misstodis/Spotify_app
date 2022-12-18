import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri"

import { logo } from "../assets";
import { HiOutlineMenu } from "react-icons/hi";

import NavLinks from "./NavLinks";

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState()

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#131615]">
        <Link to="/"><img src={logo} alt="logo" className="w-full h-14 object-contain" /></Link>
        <NavLinks />
      </div>

      {/* medium divice */}
      <div className="absolute md:hidden block mt-6 right-3 ">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2 " onClick={() => setMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className="w-6 h-6  text-white mr-2" onClick={() => setMobileMenuOpen(true)} />
        )}
      </div>
      <div className={`
        absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#131615] backdrop-blur-lg z-10 p-6 md:hiden smooth-transition
        ${mobileMenuOpen ? 'left-0' : '-left-full'}
        `}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
}




export default Sidebar;
