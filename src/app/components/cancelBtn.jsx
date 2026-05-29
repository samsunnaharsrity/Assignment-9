"use client";

import { authClient } from "@/lib/auth-client";

export default function CancelBtn({ id, onDelete, onRefresh }) {

  const handleCancel = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      // ✅ RIGHT WAY TO GET TOKEN
      const { data } = await authClient.token();
      const token = data?.token;

      if (!token) {
        alert("No token found");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`, // 🔥 FIXED
          },
        }
      );

      const dataRes = await res.json();

      if (dataRes.deletedCount > 0) {
        onDelete(id);

        // refresh from server
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="border border-red-400 text-red-500 px-4 py-1 rounded-lg"
    >
      Cancel
    </button>
  );
}