"use client";
import { useState } from "react";

export default function UpdateModal({ room, onClose, setAllRooms, token }) {
  const [form, setForm] = useState({
    roomName: room.roomName,
    floor: room.floor,
    hourlyRate: room.hourlyRate,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const payload = {
    ...form,
    hourlyRate: Number(form.hourlyRate),
  };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${room._id.toString()}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload), 
        }
      );

      const data = await res.json();

      if (data.success) {
        setAllRooms((prev) =>
          prev.map((r) =>
            r._id.toString() === room._id.toString() ? { ...r, ...form } : r
          )
        );
        onClose();
      } else {
        console.error("Update failed:", data.message);
        alert(data.message || "Update failed!");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6 shadow-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Edit Room</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="roomName"
            value={form.roomName}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Room Name"
          />
          <input
            name="floor"
            value={form.floor}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Floor"
          />
          <input
            name="hourlyRate"
            value={form.hourlyRate}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Hourly Rate"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded"
          >
            Update Rooms
          </button>
        </form>
      </div>
    </div>
  );
}