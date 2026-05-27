"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EnrollmentBtn({ room }) {

  const { data: session } = authClient.useSession();

  const router = useRouter();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleEnroll = async () => {

    if (!session) {
      toast.error("Please login first");
      return;
    }

    if (!date || !startTime || !endTime) {
      toast.error("Please select all fields");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be greater");
      return;
    }

    try {

      const { data: jwtData } = await authClient.token();

      const token = jwtData?.token;

      console.log("TOKEN:", token);

      if (!token) {
        toast.error("No token found");
        return;
      }

      const bookingData = {

        roomId: room._id,

        date,
        startTime,
        endTime,

      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/bookings`,
        {
          method: "POST",

          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data?.insertedId) {

        toast.success("Room booked successfully");

        router.push("/myBooking");

        router.refresh();

      } else {

        toast.error(data?.message || "Booking failed");

      }

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

    }
  };

  return (

    <div className="space-y-4 mt-6">

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Booking Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      </div>

      <button
        onClick={handleEnroll}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 cursor-pointer rounded-xl transition"
      >
        Book Now
      </button>

    </div>
  );
}