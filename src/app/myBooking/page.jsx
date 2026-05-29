"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import MyBookingClient from "@/myBookingClient";

export default function MyBookingPage() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {

    const loadBookings = async () => {

      try {
        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;

        console.log("TOKEN:", token);

        if (!token) {
          setLoading(false);
          return;
        }

        // FETCH BOOKINGS
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/bookings`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log("BOOKINGS:", data);

        setBookings(Array.isArray(data) ? data : []);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    loadBookings();

  }, [refresh]);


  const refreshBookings = () => {
  setRefresh((prev) => prev + 1);
};

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <MyBookingClient
  initialData={bookings}
  onRefresh={refreshBookings}
  />
  );
}