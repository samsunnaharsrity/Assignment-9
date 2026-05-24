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

  const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`, {
  method: "DELETE",
  headers: {
    authorization: `Bearer ${token}`,
  },
});



  const bookings = await res.json();

  return <MyBookingClient initialData={bookings} />;
}