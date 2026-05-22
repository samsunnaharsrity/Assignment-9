"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function AddRoomsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await authClient.token();
      const token = data?.token;

      const form = new FormData(e.target);

      const amenities = Array.from(
        document.querySelectorAll("input[name='amenities']:checked")
      ).map((e) => e.value);

      const roomData = {
        roomName: form.get("roomName"),
        description: form.get("description"),
        roomImage: form.get("roomImage"),
        floor: form.get("floor"),

        seatCapacity: form.get("capacity"), 
        hourlyRate: form.get("hourlyRate"),
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

      const dataRes = await res.json();

      if (dataRes.insertedId) {
        toast.success("Room Added Successfully");

        router.push("/myListings");
        router.refresh();
      } else {
        toast.error("Failed to add room");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 border rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        <input name="roomName" placeholder="Room Name" className="w-full border p-2" />

        <textarea name="description" placeholder="Description" className="w-full border p-2" />

        <input name="roomImage" placeholder="Image URL" className="w-full border p-2" />

        <input name="floor" placeholder="Floor" className="w-full border p-2" />

        <input name="capacity" type="number" placeholder="Capacity" className="w-full border p-2" />

        <input name="hourlyRate" type="number" placeholder="Rate" className="w-full border p-2" />

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2">
          {amenityIcons.map((item) => (
            <label key={item}>
              <input type="checkbox" name="amenities" value={item} /> {item}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 rounded-xl text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Room"}
        </button>

      </form>
    </div>
  );
}