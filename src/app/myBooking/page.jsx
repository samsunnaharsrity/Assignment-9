import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function MyBookingPage() {

  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  const session = await auth.api.getSession({
    headers: await headers()
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

  return (

    <div className="max-w-6xl mx-auto px-5 py-10">

              {/* heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          My Bookings
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          Manage your room bookings.
        </p>
      </div>



              {/* table data */}

      <div className="overflow-x-auto border rounded-2xl">

        <table className=" w-full">


          {/* table head */}
          <thead className="bg-gray-50 border-b">

            <tr className="text-center">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Room</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Time</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Total Cost
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>                
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Action
              </th>            
              
            </tr>

          </thead>


          {/* table body */}

          <tbody>

            {
              enrollments?.map((enrollment) => (

                <tr key={enrollment._id}
                 className="border-b hover:bg-gray-50 duration-300"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <img
                        src={enrollment.roomImage}
                        alt={enrollment.roomName}
                        className="w-16 h-12 rounded-md object-cover"
                      />

                      <p className="p-4 font-medium">
                        {enrollment.roomName}
                      </p>

                    </div>

                  </td>


                  {/* date */}
                  <td className="px-6 py-5 text-sm text-gray-700">

                    {new Date(enrollment.bookedAt).toLocaleDateString()}

                  </td>


                 {/* time */}
                  <td className="px-6 py-5 text-sm text-gray-700">
                    {enrollment.bookingTime}
                  </td>

                  {/* cost */}
                  <td className="px-6 py-5 font-medium text-gray-800">
                    ${enrollment.totalCost}
                  </td>

                  {/* status */}
                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold
                      ${
                        enrollment.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >

                      {enrollment.status}

                    </span>

                  </td>

                  {/* action */}
                  <td className="px-6 py-5">

                    <button className="border border-red-400 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white duration-300">

                      Cancel

                    </button>

                  </td>

                </tr>

              ))
            }


          </tbody>

        </table>

      </div>

    </div>
  );
}