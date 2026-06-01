"use client";

import { useEffect, useState } from "react";
import DeleteBtn from "../deleteBtn";
import UpdateModal from "../../../updateModal";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function MyListingsPage({ token }) {
  const [allRooms, setAllRooms] = useState([]);
  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState(null);

useEffect(() => {
  const fetchRooms = async () => {

    const { data: jwtData } = await authClient.token();

    const token = jwtData?.token;

    console.log("TOKEN:", token);

    if (!token) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/my-rooms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    setAllRooms(data);
  };

  fetchRooms();
}, []);




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
{Array.isArray(allRooms) && allRooms.length > 0 ? (
  allRooms.map((room) => (
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

      <div>Floor {room.floor}</div>
      <div>${room.hourlyRate}/hr</div>
      <div>{room.enrollmentCount || 0}</div>

      <div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
          Active
        </span>
      </div>

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
  ))
) : (
<div className="col-span-6 flex flex-col items-center justify-center py-20 text-center animate-pulse">
  
  <div className="text-6xl">📭</div>

  <h2 className="text-2xl font-bold text-gray-700 mt-4">
    Nothing Here Yet
  </h2>

  <p className="text-gray-500 mt-2">
    Your listings will appear here after you add rooms.
  </p>

</div>
)}


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