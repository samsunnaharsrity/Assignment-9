"use client";

import { useRouter } from "next/navigation";

export default function DeleteBtn({ id }) {

  const router = useRouter();

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {

        alert("Room Deleted");

        router.refresh();

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