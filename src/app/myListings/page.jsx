import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyListingsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });


  const session = await auth.api.getSession({
    headers: await headers()
  })

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
  console.log(enrollments);

  const rooms = await res.json();

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-5">My Listings</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Room</th>
            <th>Floor</th>
            <th>Rate</th>
            <th>Bookings</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomName}</td>
              <td>{room.floor}</td>
              <td>${room.hourlyRate}/hr</td>
              <td>{room.enrollmentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}