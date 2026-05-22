"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function EnrollmentBtn({ room }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEnroll = async () => {
    const { data: jwtData } = await authClient.token();
    const token = jwtData?.token;

    if (!token) {
      toast.error("Authentication Failed");
      return;
    }

    const bookingData = {
      roomId: room._id,
      roomName: room.roomName,
      userEmail: session?.user?.email,
      bookedAt: new Date(),
      status: "confirmed",
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

    if (data?._id) {
      toast.success("Room Booked Successfully");

      router.push("/myBooking");
      router.refresh(); // 🔥 VERY IMPORTANT
    } else {
      toast.error("Booking Failed");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
    >
      Book Now
    </button>
  );
}