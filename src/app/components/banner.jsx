import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";

const Banner = () => {
    return (
    <div className="relative overflow-hidden bg-white py-20">
      
      <div
        className="absolute top-10 right-0 h-[350px] w-[350px] 
        bg-green-400 rounded-full blur-[120px] opacity-20"
      />
<div className="absolute inset-0">

  {/* bg image */}
  <Image
    src="/bannerimg.png"
    alt="banner bg"
    fill
    priority
    className="object-cover"
  />

  {/* half white */}
  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>

  {/* green shade */}
  <div className="absolute inset-0 bg-green-500/10"></div>

</div>


      <div className="relative z-10 max-w-6xl mx-auto px-6 md:flex items-center justify-between gap-10">
        
        {/* left side */}
        <div className="max-w-xl space-y-5 ">
          <h2 className="text-4xl font-bold">
            Find Your Perfect <br />
            <span className="text-green-800">Study Room</span>
          </h2>

          <p className="text-gray-600 font-medium">
            Browse and book quiet, private study rooms in <br />your library.
            List your own room and earn.
          </p>

          <div className="mb-10 md:mb-1 flex gap-2">
            <Link href={"/allRooms"}>
            <button className="flex items-center text-center gap-1 font-medium text-[12px] border rounded-sm py-2 px-2 bg-green-800 text-white hover:bg-green-500 hover:scale-105 transition-transform duration-300 cursor-pointer ">
                Explore Rooms
                <FaArrowRight className="h-[10px]" />
            </button>
            </Link>


            <Link href={"/how-it-work"}>
            <button className="flex items-center gap-1 font-medium text-[12px] text-gray-600 rounded-sm py-2 px-2 border hover:border-green-800 hover:text-green-800 tracking-colors hover:scale-105 transition-transform duration-300 cursor-pointer">
                <IoPlay />
                How it Works
            </button>
            </Link>



          </div>
        </div>

        {/* right side */}
        <div>
          <Image
            src="/bannerimg.png"
            alt="banner img"
            width={500}
            height={400}
            priority
            className=" rounded-2xl object-cover h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
