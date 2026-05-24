import { auth } from "@/lib/auth";
import MyBookingClient from "@/myBookingClient";
import { headers } from "next/headers";

export const metadata = {
  title: "StudyNook – My Bookings",
};

export default async function MyBookingPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please login first</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/bookings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();

  return <MyBookingClient initialData={bookings} />;
}