"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ id, setAllRooms }) {

  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setAllRooms((prev) =>
          prev.filter((room) => room._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white duration-300"
    >
      Delete
    </button>
  );
}