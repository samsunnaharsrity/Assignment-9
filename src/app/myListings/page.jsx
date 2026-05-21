import React from 'react';

const myListingsPage = () => {
    return (
        <div>
<div className="max-w-6xl mx-auto my-10">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-3xl font-bold">My Listings</h2>
      <p className="text-gray-500 text-sm">
        Manage your listed rooms.
      </p>
    </div>

    <button className="bg-green-700 text-white px-5 py-2 rounded-md">
      Add New Room
    </button>
  </div>

  <div className="overflow-x-auto border rounded-xl">
    <table className="table">
      <thead className="bg-gray-100">
        <tr>
          <th>Room</th>
          <th>Floor</th>
          <th>Rate</th>
          <th>Bookings</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co.com/fd3WDwR/room.jpg"
                className="w-16 h-12 rounded-md object-cover"
              />

              <p className="font-medium">Quiet Focus Room</p>
            </div>
          </td>

          <td>3rd Floor</td>
          <td>$5/hr</td>
          <td>24</td>

          <td>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              Active
            </span>
          </td>

          <td>
            <div className="flex items-center gap-2">
              <button className="border px-3 py-1 rounded-md">
                Edit
              </button>

              <button className="border border-red-500 text-red-500 px-3 py-1 rounded-md">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>        </div>
    );
}

export default myListingsPage;
