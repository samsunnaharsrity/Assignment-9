"use client";

import { useState } from "react";
import CancelBtn from "./app/components/cancelBtn";

export default function MyBookingClient({ initialData }) {
  const [rooms, setRooms] = useState(initialData);

  const handleDelete = (id) => {
    setRooms((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 dark:text-stone-50">
      
      {/* heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          My Bookings
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Manage your room bookings.
        </p>
      </div>

      <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm dark:bg-stone-300">
        
        <table className="w-full">

          {/* table head */}
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Room
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>

            {Array.isArray(rooms) && rooms.length > 0 ? (

              rooms.map((room) => (

                <tr
                  key={room._id}
                  className="border-b hover:bg-gray-50 duration-300"
                >
                  
                  {/* room */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">

                      <img
                        src={room.roomImage}
                        alt={room.roomName || "Room-Name" }
                        className="w-16 h-12 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {room.roomName || "Room-name"}
                        </h3>
                      </div>

                    </div>
                  </td>

                  {/* date */}
                  <td className="px-2 py-5 text-sm text-gray-700">
                    {new Date(room.bookedAt).toLocaleDateString()}
                  </td>

                  {/* status */}
                  <td className="px-2 py-5">
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold">
                      Confirmed
                    </span>
                  </td>

                  {/* action */}
                  <td className="px-2 py-5">
                    <CancelBtn
                      id={room._id}
                      onDelete={handleDelete}
                    />
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12"
                >
                  <div className="flex flex-col items-center justify-center">

                    <div className="text-5xl mb-3">
                      📭
                    </div>

                    <h3 className="text-lg font-semibold text-gray-700">
                      No Bookings Found
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      You haven’t booked any rooms yet.
                    </p>

                    <button
                      onClick={() => window.location.href = "/"}
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Browse Rooms
                    </button>

                  </div>
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}