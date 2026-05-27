import { auth } from "@/lib/auth";
import MyBookingClient from "@/myBookingClient";
import { headers } from "next/headers";

export const metadata = {
  title: "StudyNook – My Bookings",
};

export default async function MyBookingPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please login first</div>;
  }

const token = session?.session?.token || session?.token;

  if (!token) {
    return <div>Token not found</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const bookings = await res.json();
  console.log("BOOKINGS:", bookings);

  return <MyBookingClient initialData={bookings} />;
}