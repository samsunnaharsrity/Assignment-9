// const UpdateRoomPage = async ({ params }) => {
//   const { id } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   const room = await res.json();

//   return (
//     <div>
//       <h1>Edit Room</h1>

//       <form>
//         <input defaultValue={room.roomName} />
//       </form>
//     </div>
//   );
// };

// export default UpdateRoomPage;

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedRoom = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: form.capacity.value,
      hourlyRate: form.hourlyRate.value,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedRoom),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Room updated successfully");
      router.push("/my-listings");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">
          Edit Study Room
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <div>
            <label className="font-medium">Room Name</label>
            <input
              type="text"
              name="roomName"
              defaultValue={room.roomName}
              className="w-full border rounded-lg p-3 mt-1"
              required
            />
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={room.description}
              className="w-full border rounded-lg p-3 mt-1 h-28"
              required
            />
          </div>

          <div>
            <label className="font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={room.image}
              className="w-full border rounded-lg p-3 mt-1"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="font-medium">Floor</label>
              <input
                type="text"
                name="floor"
                defaultValue={room.floor}
                className="w-full border rounded-lg p-3 mt-1"
                required
              />
            </div>

            <div>
              <label className="font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                defaultValue={room.capacity}
                className="w-full border rounded-lg p-3 mt-1"
                required
              />
            </div>

            <div>
              <label className="font-medium">Hourly Rate</label>
              <input
                type="number"
                name="hourlyRate"
                defaultValue={room.hourlyRate}
                className="w-full border rounded-lg p-3 mt-1"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Update Room
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateRoomPage;