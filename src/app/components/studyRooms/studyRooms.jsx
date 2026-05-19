
import { fetchStudyRoomData } from "@/app/lib/rooms/data";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

const StudyRooms =async({room}) => {
    // const rooms = await fetchStudyRoomData()
    // console.log(rooms);

     const {_id,roomImage, roomName , floor, seatCapacity, amenities, hourlyRate} = room;

    return (


      <div className="px-5 py-5 ">
        <div className=" bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:translate-y-1 hover:shadow-xl">

        <div className="p-5 space-y-3">
            <div className="">
            <img
                src={roomImage}
                alt="rooms img"
                className="w-full h-64 rounded-2xl object-cover"
            />
            </div> 

            <div>
                <h2 className=' gap-1 text-xl font-bold'>
                    {roomName}
                </h2>
            </div>

            <div className="flex justify-between font-medium text-[12px]">

            <div className="flex items-center gap-1 ">
                <FaRegUser className="w-[15px] h-[15px] " />
                {seatCapacity}
            </div>
                
            <div>
                {hourlyRate}
            </div>
                
            </div>

                {/* showAmenities card */}
        <div className="flex flex-wrap gap-2 mt-4">

          {
            amenities?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >

                <img
                  src="/wifi.png"
                  alt="icon"
                  className="w-4 h-4"
                />

                <span className="text-sm">
                  {item}
                </span>

              </div>
            ))
          }

                      {/* card btn */}

        </div>

        <Link href={`/rooms/${_id}`}>
              <button className="flex items-center w-full justify-center gap-1 font-medium text-[12px] rounded-sm py-2 px-2 border border-green-800 text-green-800 tracking-colors hover:bg-green-800 hover:text-white/70 animate-pulse">
                View Details
            </button>      
        </Link>

        </div>
        </div>


        
      </div>
    );
}

export default StudyRooms;
