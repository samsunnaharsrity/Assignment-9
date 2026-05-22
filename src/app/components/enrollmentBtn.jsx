"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EnrollmentBtn({ room }) {

  const { data: session } = useSession();

  const router = useRouter();

  const handleEnroll = async () => {

    try {

      const { data: jwtData } = await authClient.token();

      const token = jwtData?.token;

      console.log(token);

      if (!token) {
        toast.error("No Token Found");
        return;
      }

      const bookingData = {

        roomId: room._id,
        roomName: room.roomName,
        roomImage: room.roomImage,
        userId: session?.user?.id,
        userEmail: session?.user?.email,

        bookedAt: new Date(),

        bookingDate: "May 20, 2024",
        bookingTime: "10:00 AM - 12:00 PM",

        totalCost: room.hourlyRate * 2,

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

      console.log(res);

      const data = await res.json();

      console.log(data);

      if (data?.insertedId) {

        toast.success("Room Booked Successfully");

        router.push("/myBooking");

        router.refresh();

      } else {

        toast.error(data?.message || "Booking Failed");

      }

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

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