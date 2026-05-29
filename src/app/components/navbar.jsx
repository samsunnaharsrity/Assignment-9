"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Moon, Sun } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { useTheme } from "@/theme/theme-provider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/allRooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/how-it-work", label: "How It Works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Avoid repeated handler creation issues
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu on route change (better UX)
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  // ✅ memoized class generator (avoids recalculation every render)
  const navClass = useMemo(() => {
    return (path) =>
      pathname === path
        ? "text-green-800 border-b-2 border-green-800 pb-1 font-medium"
        : "text-gray-500 dark:text-stone-50 hover:text-green-800 font-medium";
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-sm py-2"
          : "bg-slate-100 dark:bg-stone-900 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="StudyNook" className="w-[60px]" />
            <h2 className="font-extrabold text-2xl text-gray-800 dark:text-stone-50">
              StudyNook
            </h2>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={navClass(link.href)}>
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <Link href="/addRooms" className={navClass("/addRooms")}>
                  Add Room
                </Link>
                <Link href="/myListings" className={navClass("/myListings")}>
                  My Listings
                </Link>
                <Link href="/myBooking" className={navClass("/myBooking")}>
                  My Bookings
                </Link>
              </>
            )}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-stone-50"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* AUTH */}
            {isPending ? null : user ? (
              <div className="hidden md:flex items-center gap-2">
                <Avatar className="w-[28px] h-[28px]">
                  <Avatar.Image src={user.image} />
                  <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-[12px] bg-green-800 text-white px-2 py-1 rounded"
                >
                  <FiLogOut className="text-[10px]" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  href="/login"
                  className="text-sm border px-3 py-1 rounded text-gray-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-green-800 text-white px-3 py-1 rounded"
                >
                  Register
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpenMenu((p) => !p)}
            >
              {openMenu ? <IoMdCloseCircleOutline /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {openMenu && (
          <div className="md:hidden mt-3 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={navClass(link.href)}>
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <Link href="/addRooms" className={navClass("/addRooms")}>
                  Add Room
                </Link>
                <Link href="/myListings" className={navClass("/myListings")}>
                  My Listings
                </Link>
                <Link href="/myBooking" className={navClass("/myBooking")}>
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left text-sm text-white bg-green-800 px-3 py-2 rounded"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            )}

            {!user && (
              <div className="flex flex-col gap-2">
                <Link href="/login" className="border px-3 py-2 rounded">
                  Login
                </Link>
                <Link href="/register" className="bg-green-800 text-white px-3 py-2 rounded">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}