import StudyRooms from '../components/studyRooms/studyRooms';
import { fetchRoomData } from '@/lib/rooms/data';
// import SearchBar from '@/components/SearchBar';
import SearchBar from '../components/searchBar';
export const metadata = {
  title: "StudyNook – Rooms",
};
const AllRoomsPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q?.toLowerCase().trim() || "";

  const rooms = await fetchRoomData();

  const filteredRooms = query
    ? rooms?.filter(
        (room) =>
          room.roomName?.toLowerCase().includes(query) ||
          room.floor?.toLowerCase().includes(query)
      )
    : rooms; 

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
      <div>
        <h2 className="text-2xl font-bold">All Study Room</h2>
        <p className="text-gray-600">Explore all available study rooms.</p>
      </div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
        {filteredRooms?.length > 0 ? (
          filteredRooms.map((room) => (
            <StudyRooms key={room._id || room.id} room={room} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center mt-10">
            No rooms found for "{resolvedParams?.q}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRoomsPage;