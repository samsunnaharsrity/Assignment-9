
import { fetchStudyRoomData } from "@/app/lib/rooms/data";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

const StudyRooms =async({room}) => {
    // const rooms = await fetchStudyRoomData()
    // console.log(rooms);

     const {_id,roomImage, roomName , floor, seatCapacity, amenities, hourlyRate} = room;

     const visibleAmenities = room.amenities?.slice(0, 3);

    return (


      <div className="px-5 py-5 ">
        <div className=" bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:translate-y-1 hover:shadow-xl">

        <div className="p-5 space-y-3">
            <div className="relative">
            <img
                src={roomImage}
                alt="rooms img"
                className="w-full h-64 rounded-2xl object-cover"
            />

            
            <span className="absolute top-3 left-2 bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-[10px] transition-all duration-300 hover:translate-y-1 cursor-pointer">
               {floor}
            </span>
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
          {/* amenities */}
<div className="flex flex-wrap gap-2">

  {
    visibleAmenities?.map((item, index) => (

      <div
        key={index}
        className="flex items-center text-center gap-1 border border-green-800 px-1 py-1 rounded-xl text-[10px] text-green-800 font-semibold"
      >

        <span>{item}</span>

      </div>

    ))
  }

  {
    room?.amenities?.length > 3 && (

      <div className="flex items-center justify-center border border-green-800 px-1 py-1 rounded-xl bg-gray-100 text-green-800 text-[8px]">

        +{room.amenities.length - 3}

      </div>

    )
  }

</div>
                      {/* card btn */}


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
