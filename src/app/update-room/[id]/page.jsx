"use client";

import { useState } from "react";

export default function UpdateModal({ room, onClose, setAllRooms, token }) {
  const [form, setForm] = useState(room);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("ERROR:", data);
        return;
      }

      if (data.modifiedCount > 0) {
        setAllRooms((prev) =>
          prev.map((r) =>
            r._id === room._id ? { ...r, ...form } : r
          )
        );

        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
    
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Update Room
      </h2>

      <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-500 text-xl"
      >
        ✕
      </button>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Room Name
        </label>

        <input
          name="roomName"
          value={form.roomName || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Floor
        </label>

        <input
          name="floor"
          value={form.floor || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Hourly Rate
        </label>

        <input
          type="number"
          name="hourlyRate"
          value={form.hourlyRate || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
  );
}