"use client";

export default function CancelBtn({ id, onDelete }) {

const handleCancel = async () => {

  const confirmDelete = window.confirm(
    "Are you sure?"
  );

  if (!confirmDelete) return;

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/enrollments/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.deletedCount > 0) {

      onDelete(id);

      alert("Booking cancelled");

    }

  } catch (error) {

    console.log(error);

  }
};

  return (
    <button
      onClick={handleCancel}
      className="border border-red-400 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white"
    >
      Cancel
    </button>
  );
}