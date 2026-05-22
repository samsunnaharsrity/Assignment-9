import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export default async function MyBookingPage(){


  const {token} = await auth.api.getToken({
    headers: await headers()
  })


    return (
<div>
<div className="max-w-6xl mx-auto my-10">
  <div className="mb-6">
    <h2 className="text-3xl font-bold">My Bookings</h2>
    <p className="text-gray-500 text-sm">
      Manage your room bookings.
    </p>
  </div>

  <div className="overflow-x-auto border rounded-xl">
    <table className="table">
      <thead className="bg-gray-100">
        <tr>
          <th>Room</th>
          <th>Date</th>
          <th>Time</th>
          <th>Total Cost</th>
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

          <td>May 20, 2024</td>
          <td>10:00 AM - 12:00 PM</td>
          <td>$10</td>

          <td>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              Confirmed
            </span>
          </td>

          <td>
            <button className="border border-red-500 text-red-500 px-4 py-1 rounded-md">
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
    );
}

// export default MyBookingPage;
