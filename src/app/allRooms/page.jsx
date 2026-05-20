import React from 'react';
// import { fetchRoomData } from '../lib/rooms/data';
import StudyRooms from '../components/studyRooms/studyRooms';
import { fetchRoomData } from '@/lib/rooms/data';

const AllRoomsPage = async() => {

    const rooms = await fetchRoomData()

    return (
        <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
            <div>
                <h2 className='text-2xl font-bold'>
                    All Study Room
                </h2>

                 <p className="text-gray-600">
                    Explore all available study rooms.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">

                {
                    rooms?.map((room, index) => (

                        <StudyRooms
                            key={index}
                            room={room}
                        />

                    ))
                }

            </div>
        </div>
    );
}

export default AllRoomsPage;
