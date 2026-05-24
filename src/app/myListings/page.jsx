"use client";

import { useEffect, useState } from "react";
import DeleteBtn from "../deleteBtn";
import UpdateModal from "../../../updateModal";
import { useRouter } from "next/navigation";


export default function MyListingsPage({ token }) {
  const [allRooms, setAllRooms] = useState([]);
  const router = useRouter();

useEffect(() => {
  if (!token) return;

  const fetchRooms = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/my-rooms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.status === 401) {
      console.log("Unauthorized - token invalid");
      return;
    }

    setAllRooms(Array.isArray(data) ? data : []);
  };

  fetchRooms();
}, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-gray-500">Manage your study rooms</p>
        </div>

    <button
      onClick={() => router.push("/addRooms")}
      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
      + Add New Room
    </button>
      </div>

      {/* TABLE CARD */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden ">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 bg-gray-100 p-4 font-semibold text-gray-600">
          <div>Room</div>
          <div>Floor</div>
          <div>Rate</div>
          <div>Bookings</div>
          <div>Status</div>
          <div className="text-center">Action</div>
        </div>

        {/* TABLE BODY */}
        {Array.isArray(allRooms) && allRooms.map((room) => (
          <div
            key={room._id}
            className="grid grid-cols-6 items-center p-4 border-b hover:bg-gray-50"
          >

            {/* ROOM */}
            <div className="flex items-center gap-3">
              <img
                src={room.roomImage}
                alt="room"
                className="w-14 h-12 rounded-md object-cover"
              />
              <span className="font-medium">{room.roomName}</span>
            </div>

            {/* FLOOR */}
            <div>Floor {room.floor}</div>

            {/* RATE */}
            <div>${room.hourlyRate}/hr</div>

            {/* BOOKINGS */}
            <div>{room.enrollmentCount || 0}</div>

            {/* STATUS */}
            <div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                Active
              </span>
            </div>

            {/* ACTION */}
            <div className="flex justify-center gap-2">

              <button
                onClick={() => setSelectedRoom(room)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <DeleteBtn
                id={room._id}
                token={token}
                setAllRooms={setAllRooms}
              />

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedRoom && (
        <UpdateModal
          room={selectedRoom}
          token={token}
          onClose={() => setSelectedRoom(null)}
          setAllRooms={setAllRooms}
        />
      )}

    </div>
  );
}