"use client"

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Navbar = () => {
const pathName = usePathname()
// console.log(pathName);

// const isActive = href === pathName;


const { data: session } = authClient.useSession()
//console.log(session);
const user = session?.user;
console.log(user);

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

        {
          user && (
            <div className="flex flex-col gap-2">
            <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/addRooms"
                className={navLinkClass("/addRooms")}
                >Add Room</Link>
            </div>
              
            <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/myListings"
                className={navLinkClass("/myListings")}
                >
                My Listings
              </Link>
            </div>

            <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/myBooking">
                My Bookings
              </Link>
            </div>
              
            </div>
          )
        } 



                    {/* login logout register btn */}
{
      user? (
      <div className="flex items-center gap-1">
          <Avatar className="w-[25px] h-[25px] ">
          <Avatar.Image alt="user img"
          src={user?.image} />
          <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
        </Avatar>


            <div 
            onClick={async() => await authClient.signOut()} 
            className=" font-medium text-[12px] border rounded-sm py-1 px-2 text-white bg-green-800 hover:bg-green-600">
                <Link href={"/"} className="flex items-center gap-1 font-semibold">
                <span><FiLogOut className="text-[8px]"/></span>
                Logout
                </Link>
            </div>

      </div>)            
        :         
            (   <div className=" items-center gap-4">
                    <div className="flex flex-col gap-2">

                        <Link href="/login"
                        className="font-medium text-[10px] text-gray-600 border border-gray-600 rounded-sm py-1 px-3 hover:bg-green-800 hover:text-white tracking-colors">
                        Login
                        </Link>

                        <Link href="/register"
                        className="font-medium text-[10px]  rounded-sm py-1 px-2 bg-green-800 text-white hover:bg-green-500">
                        Register
                        </Link>
                    </div>
                </div>)
}
                    </div>


                    </div>



                </div>                       


                {/* main nav sec */}
                <div className="hidden md:flex gap-8 items-center"
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

        {
          user && (
            <div className="hidden md:flex gap-8 items-center {`${isActive ? 'border-b-2 border-orange-400 text-orange-400' : ''}`}">
            <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/addRooms"
                className={navLinkClass("/addRooms")}
                >Add Room</Link>
            </div>
              
            <div className="font-medium text-gray-500 hover:text-green-800">
                <Link href="/myListings"
                className={navLinkClass("/myListings")}
                >
                My Listings
              </Link>
            </div>
              

              <Link href="/myBooking"
              className={navLinkClass("/myBooking")}
              >
              
                My Bookings
              </Link>
            </div>
          )
        }                 
                </div>

                

                {/* login logout register btn */}
                {
                    user? (
                    <div className="hidden md:flex items-center gap-1">
                        <Avatar className="w-[25px] h-[25px] ">
                        <Avatar.Image alt="user img"
                        src={user?.image} />
                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                        </Avatar>


                            <div 
                            onClick={async() => await authClient.signOut()} 
                            className=" font-medium text-[12px] border rounded-sm py-1 px-2 text-white bg-green-800 hover:bg-green-600">
                                <Link href={"/"} className="flex items-center gap-1 font-semibold">
                                <span><FiLogOut className="text-[8px]"/></span>
                                Logout
                                </Link>
                            </div>

                    </div>)            
                        :         
                            (   <div className="hidden md:flex items-center gap-4">
                                    <div className="gap-2 flex">

                                        <Link href="/login"
                                        className="font-medium text-[13px] text-gray-600 border border-gray-600 rounded-sm py-1 px-3 hover:bg-green-800 hover:text-white tracking-colors">
                                        Login
                                        </Link>

                                        <Link href="/register"
                                        className="font-medium text-[14px] border rounded-sm py-1 px-2 bg-green-800 text-white hover:bg-green-500">
                                        Register
                                        </Link>
                                    </div>
                                </div>)
                }

            </div>
             
            </div>

        </div>
    );
}

export default Navbar;
