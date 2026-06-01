"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateModal({
  room,
  onClose,
  setAllRooms,
}) {
  const [formData, setFormData] = useState(room);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data: jwtData } = await authClient.token();

      const token = jwtData?.token;

      if (!token) {
        alert("Login required");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {
        setAllRooms((prev) =>
          prev.map((r) =>
            r._id === room._id
              ? { ...r, ...formData }
              : r
          )
        );

        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          Update Room
        </h2>

        <form
          onSubmit={handleUpdate}
          className="space-y-3"
        >
          <input
            type="text"
            name="roomName"
            value={formData.roomName || ""}
            onChange={handleChange}
            className="border w-full p-2"
          />

          <input
            type="text"
            name="floor"
            value={formData.floor || ""}
            onChange={handleChange}
            className="border w-full p-2"
          />

          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate || ""}
            onChange={handleChange}
            className="border w-full p-2"
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded"
          >
            Update
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 text-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}