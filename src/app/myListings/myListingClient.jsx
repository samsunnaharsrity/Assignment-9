"use client";

import { useState } from "react";
import UpdateModal from "./UpdateModal";
import DeleteBtn from "../deleteBtn";

export default function MyListingsClient({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allRooms, setAllRooms] = useState(rooms);

  return (
    <div>
      <table className="w-full border">
        <tbody>
          {allRooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomName}</td>

              <td>
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <DeleteBtn id={room._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRoom && (
        <UpdateModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          setAllRooms={setAllRooms}
        />
      )}
    </div>
  );
}