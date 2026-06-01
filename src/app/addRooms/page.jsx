"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function AddRoomsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [previewRate, setPreviewRate] = useState(0);
  const [capacity, setCapacity] = useState(1);

  const amenityIcons = [
    "WiFi",
    "Projector",
    "AC",
    "Coffee Access",
    "Whiteboard",
    "Noise Cancellation",
    "Smart TV",
    "Charging Ports",
    "Premium Chairs",
    "Mini Fridge",
    "Monitor",
    "Bookshelf",
    "24/7 Access",
    "Coffee Machine",
    "Interactive Display",
    "Soft Lighting",
    "Soundproof",
  ];

  const [amenities, setAmenities] = useState([]);

  const handleAmenityChange = (value) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error("Login required");
        setLoading(false);
        return;
      }

      const form = new FormData(e.target);

      const roomData = {
        roomName: form.get("roomName"),
        description: form.get("description"),
        roomImage: form.get("roomImage"),
        floor: form.get("floor"),
        seatCapacity: Number(form.get("capacity")),
        hourlyRate: Number(form.get("hourlyRate")),
        amenities,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(roomData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Room Added Successfully");
        router.push("/myListings");
        router.refresh();
      } else {
        toast.error(data.message || "Failed To Add Room");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TOTAL COST CALCULATION
  const totalCost = Number(previewRate || 0) * Number(capacity || 1);

  return (
    <div className="max-w-4xl mx-auto my-10 border rounded-xl p-8 bg-white shadow">

      <h1 className="text-2xl font-bold mb-6">Add New Room</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Room Name */}
        <input
          name="roomName"
          placeholder="Room Name"
          className="w-full border p-3 rounded-lg"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded-lg"
        />

        {/* Image */}
        <input
          name="roomImage"
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg"
        />

        {/* Floor */}
        <input
          name="floor"
          placeholder="Floor"
          className="w-full border p-3 rounded-lg"
        />

        {/* Capacity */}
        <input
          name="capacity"
          type="number"
          placeholder="Seat Capacity"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setCapacity(e.target.value)}
        />

        {/* Hourly Rate */}
        <input
          name="hourlyRate"
          type="number"
          placeholder="Hourly Rate"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setPreviewRate(e.target.value)}
        />

        {/* 🔥 LIVE PREVIEW SECTION */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Base Rate: <span className="font-semibold">${previewRate || 0}/hr</span>
          </p>

          <p className="text-sm text-gray-600">
            Capacity: <span className="font-semibold">{capacity || 1} seats</span>
          </p>

          <p className="text-lg font-bold text-green-600 mt-2">
            Total Value: ${totalCost}/hr
          </p>
        </div>

        {/* AMENITIES */}
        <div>
          <h2 className="font-semibold mb-2">Select Amenities</h2>

          <div className="grid grid-cols-2 gap-2">
            {amenityIcons.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={amenities.includes(item)}
                  onChange={() => handleAmenityChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 rounded-xl text-white px-5 py-3 w-full disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Room"}
        </button>

      </form>
    </div>
  );
}