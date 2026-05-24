"use client";

import { useState } from "react";
import CancelBtn from "./app/components/cancelBtn";

export default function MyBookingClient({ initialData }) {

  const [rooms, setRooms] = useState(initialData || []);

  const handleDelete = (id) => {
    setRooms((prev) =>
      prev.filter((item) => item._id !== id)
    );
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

      {/* table */}
      <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm dark:bg-stone-300">

        <table className="w-full">

          {/* table head */}
          <thead className="bg-gray-50 border-b">

            <tr className="text-left">

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Room
              </th>

<td className="px-2 py-5 text-sm text-gray-700">
  {initialData.date
    ? new Date(initialData.date).toLocaleDateString()
    : "No Date"}
</td>
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

            {rooms.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500 font-medium"
                >
                  No Bookings Found!
                </td>

              </tr>

            ) : (

              rooms.map((room) => (

                <tr
                  key={room._id}
                  className="border-b hover:bg-gray-50 duration-300"
                >

                  {/* room */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={room.roomImage || "/placeholder.jpg"}
                        alt={room.roomName}
                        className="w-16 h-12 rounded-lg object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-gray-800">
                          {room.roomName || "Unknown Room"}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Study Room
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* date */}
                  <td className="px-2 py-5 text-sm text-gray-700">
                    {room.bookedAt
                      ? new Date(room.bookedAt).toLocaleDateString()
                      : "No Date"}
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

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}