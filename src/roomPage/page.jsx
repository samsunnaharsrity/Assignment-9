import StudyRooms from "@/app/components/studyRooms/studyRooms"
import { fetchStudyRoomData } from "@/lib/rooms/data"
// import { fetchStudyRoomData } from "@/app/lib/rooms/data"
import Link from "next/link"

const fetchRoomData = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`)
    const data = await res.json()
    return data
}

const RoomPage = async() => {

    const rooms = await fetchStudyRoomData()
    console.log(rooms);

    // const latesRooms = rooms.slice(0,6)
    // console.log(latesRooms);

    return (
        <div className="space-y-6">

            <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 ">
                <div>
                    <h2 className='text-2xl font-bold'>Newest Study Rooms</h2>

                    <p className="text-gray-600 font-medium">New spaces. Better focus. Smarter studying. <br /> Explore our latest study rooms built for productive learning sessions.</p>
                </div>                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6 ">
                {
                    rooms?.map((room , index)=> <div key={index}>
                        <StudyRooms key={index} room={room}></StudyRooms>
                        {/* <p>{room.roomImage}</p> */}
                    </div> 
                )
                }
            </div>


            <Link href={'/allRooms'}  className="w-full flex justify-center">
                <button className="flex items-center justify-center text-center gap-1 font-medium text-[12px] border rounded-sm py-2 px-2 bg-green-800 text-white hover:bg-green-500 hover:ring-4 hover:ring-green-300 transition-all duration-300">View More rooms</button>
            </Link>
        </div>
    );
}

export default RoomPage;
