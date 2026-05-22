"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddRoomsPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await authClient.token();
    const token = data?.token;

    const form = new FormData(e.target);

    const amenities = Array.from(
      document.querySelectorAll("input[name='amenities']:checked")
    ).map((el) => el.value);

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

    const dataRes = await res.json();

    if (dataRes.insertedId) {
      toast.success("Room Added Successfully");
      router.push("/my-listings");
      router.refresh();
    } else {
      toast.error("Failed to add room");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 border rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        <input name="roomName" placeholder="Room Name" className="w-full border p-2" />

        <textarea name="description" placeholder="Description" className="w-full border p-2" />

        <input name="roomImage" placeholder="Image URL" className="w-full border p-2" />

        <input name="floor" placeholder="Floor" className="w-full border p-2" />

        <input name="capacity" type="number" placeholder="Capacity" className="w-full border p-2" />

        <input name="hourlyRate" type="number" placeholder="Rate" className="w-full border p-2" />

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2">
          {["WiFi", "Projector", "AC", "Whiteboard"].map((item) => (
            <label key={item}>
              <input type="checkbox" name="amenities" value={item} /> {item}
            </label>
          ))}
        </div>

        <button className="bg-green-700 text-white px-4 py-2">
          Add Room
        </button>

      </form>
    </div>
  );
}