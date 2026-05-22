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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/enrollments/${session?.user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const enrollments = await res.json();

  return <MyBookingClient initialData={enrollments} />;
}