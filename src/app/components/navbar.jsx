"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Navbar = () => {
const pathName = usePathname()
// console.log(pathName);

// const isActive = href === pathName;
const navLinkClass = (path) =>
  pathName === path
    ? "font-medium text-green-800 border-b-2 border-green-800 pb-1"
    : "font-medium text-gray-500 hover:text-green-800";
    
    const [openMenu , setOpenMenu] = useState(false)
    
    const [scrolled , setScrolled] = useState(false)

useEffect(() => {
    const handleScroll =() => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll",handleScroll)
    return () => window.removeEventListener("scroll",handleScroll)
},[])

    return (
        <div className={`sticky top-0 w-full z-50 transition-all duration-200  
        ${scrolled ? "bg-white blur-md shadow-sm py-2 " : "bg-slate-100 py-2" }`}>

            <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">

                    
            <div className="flex items-center gap-2 justify-between">

                {/* logo side */}
            <div className="flex justify-between items-center">

                <div className="flex items-center">
                    <div className="w-[70px]">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <h2 className="font-extrabold text-2xl text-gray-800">StudyNook</h2>

                </div>
            </div>
                          {/* responsive sidebar */}

                <div className="relative md:hidden flex">

                    <div
                    className=" md:hidden text-2xl cursor-pointer px-2  relative z-30"
                    onClick={() => setOpenMenu(!openMenu)}
                    >
                    {openMenu ? <IoMdCloseCircleOutline /> : <HiMenuAlt3 />}
                    </div>

                    {openMenu && (
                    <div
                        className="fixed inset-0 md:hidden z-10"
                        onClick={() => setOpenMenu(false)}
                    />
                    )}

                    <div
                    className={`absolute top-0 right-0 text-right p-4 z-20
                    transform transition-transform duration-300 md:hidden

                    ${openMenu ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}
                    >
                    <div className="flex flex-col gap-2 font-semibold text-[12px] ">
                        <Link href="/"
                        className={navLinkClass("/")}
                        >Home</Link>
                        <Link href="/allRooms"
                        className={navLinkClass("/allRooms")}
                        >Rooms</Link>
                        <Link href="/"
                        className={navLinkClass("/")}
                        >About</Link>
                    </div>

                    </div>



                </div>                       


                {/* main nav sec */}
                <div className="hidden md:flex gap-8 items-center {`${isActive ? 'border-b-2 border-orange-400 text-orange-400' : ''}`}"
                onClick={() => setOpenMenu(!openMenu)}
                >

                <div className="font-medium text-gray-500 hover:text-green-800">
                    <Link href="/" 
                className={navLinkClass("/")}>
                Home
                </Link>
                </div>

                <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/allRooms" 
                className={navLinkClass("/allRooms")}>
                Rooms
                </Link>
                </div>

                <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/" 
                className={navLinkClass("/about")}>
                About
                </Link>                    
                </div>

                <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/" 
                className={navLinkClass("/works")}>
                How It Works
                </Link>                    
                </div>

                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="gap-2 flex">

                        <Link href="/login"
                        className="font-medium text-[14px] text-gray-600 rounded-sm py-1 px-2 border hover:text-green-800 hover:border border-green-800 tracking-colors">
                        Login
                        </Link>

                        <Link href="/register"
                        className="font-medium text-[14px] border rounded-sm py-1 px-2 bg-green-800 text-white hover:bg-green-500">
                        Register
                        </Link>
                    </div>
                </div>
            </div>
             
            </div>

        </div>
    );
}

export default Navbar;
