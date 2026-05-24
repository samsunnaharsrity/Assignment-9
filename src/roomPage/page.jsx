import StudyRooms from "@/app/components/studyRooms/studyRooms";
import Link from "next/link";

export const metadata = {
  title: "StudyNook – Rooms",
};

const fetchRoomData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`,
      {
        cache: "no-store", // always fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch rooms");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const RoomPage = async () => {
  const rooms = await fetchRoomData();

  return (
    <div className="space-y-6">
      <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 dark:text-stone-50">
        <h2 className="text-2xl font-bold">Newest Study Rooms</h2>

        <p className="text-gray-600 font-medium">
          New spaces. Better focus. Smarter studying.
          <br />
          Explore our latest study rooms built for productive learning sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6 dark:text-stone-50">
        {rooms?.map((room) => (
          <StudyRooms key={room._id || room.id} room={room} />
        ))}
      </div>

      <Link href="/allRooms" className="w-full flex justify-center">
        <button className="flex items-center justify-center gap-1 font-medium text-[12px] border rounded-sm py-2 px-2 bg-green-800 text-white hover:bg-green-500 hover:ring-4 hover:ring-green-300 transition-all duration-300 cursor-pointer">
          View More rooms
        </button>
      </Link>
    </div>
  );
};

export default RoomPage;