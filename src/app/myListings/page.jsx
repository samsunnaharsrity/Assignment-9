// "use client"

// import Link from "next/link";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import DeleteBtn from "../deleteBtn";
// import { useState } from "react";

// export const metadata = {
//   title: "StudyNook – My Listings",
// };

//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [rooms, setAllRooms] = useState(rooms || []);

// export default async function MyListingsPage() {

//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`,
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const rooms = await res.json();

//   return (

//     <div className="max-w-4xl mx-auto my-10 px-3 sm:px-0">

//       {/* heading */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

//         <div>

//           <h2 className="text-3xl font-bold">
//             My Listings
//           </h2>

//           <p className="text-gray-500 text-sm">
//             Manage your listed rooms.
//           </p>

//         </div>


//           <button className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-600 duration-300 cursor-pointer">
//         <Link href="/addRooms">

//             Add New Room

//         </Link>
//           </button>


//       </div>

//       {/* table head*/}
//       <div className="overflow-x-auto border rounded-xl">

//         <table className="min-w-[700px] w-full text-sm sm:text-base">

//           <thead className="bg-gray-100 border-b dark:text-stone-50">

//             <tr className="text-left ">
//               <th className="px-6 py-4">Room</th>
//               <th className="px-6 py-4">Floor</th>
//               <th className="px-6 py-4">Rate</th>
//               <th className="px-6 py-4">Bookings</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-16 py-4">Action</th>
//             </tr>

//           </thead>


//                   {/* table body */}
//           <tbody>

//             {
//               rooms?.map((room) => (

//                 <tr key={room._id}
//             className="border-b hover:bg-gray-50 duration-300 dark:hover:bg-gray-500"

//                 >

//                   {/* room */}
//                   <td className="px-6 py-4 text-left">

//                     <div className="flex items-center gap-5">

//                       <img
//                         src={
//                           room.roomImage
//                         }
//                         alt={room.roomName}
//                         className="w-16 h-12 rounded-md object-cover"
//                       />

//                       <p className="font-medium">
//                         {room.roomName}
//                       </p>

//                     </div>

//                   </td>

//                   {/* floor */}
//                   <td className="px-6 py-4 text-left">
//                     Floor{room.floor}
//                   </td>

//                   {/* rate */}
//                   <td className="px-6 py-4 text-left">
//                     ${room.hourlyRate}/hr
//                   </td>

//                   {/* bookings */}
//                   <td className="px-12 py-4 text-left">
//                     {room.enrollmentCount || 0}
//                   </td>

//                   {/* status */}
//                   <td className="px-6 py-4 text-left">

//                     <span className="bg-green-100 text-green-700 px-5 py-1 rounded-full text-xs">

//                       Active

//                     </span>

//                   </td>

//                   {/* actions */}
//                 <td className="px-6 py-4 flex gap-2">

//                   {/* 🔥 EDIT BUTTON → MODAL OPEN */}
                
//                   <Link href={`/update-room/${room._id}`} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 duration-300">
//                     Edit
//                   </Link>
//                   <DeleteBtn id={room._id} />
//                 </td>

//                 </tr>

//               ))
//             }

//           </tbody>

//         </table>

//       </div>

//       {selectedRoom && (
//         <EditModal
//           room={selectedRoom}
//           onClose={() => setSelectedRoom(null)}
//           setAllRooms={setAllRooms}
//         />
//       )}

//     </div>
//   );
// }

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyListingsClient from "../../../myListingClient";

export const metadata = {
  title: "StudyNook – My Listings",
};

export default async function MyListingsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const rooms = await res.json();

  return <MyListingsClient rooms={rooms} />;
}