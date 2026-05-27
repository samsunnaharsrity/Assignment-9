import Image from "next/image";
import {
  FaWifi,
  FaChalkboard,
  FaTv,
  FaChargingStation,
} from "react-icons/fa";

import {
  MdCoffeeMaker,
  MdDisplaySettings,
  MdNoiseAware,
  MdOutlineCoffeeMaker,
} from "react-icons/md";

import { TbAirConditioning } from "react-icons/tb";
import { BsProjector } from "react-icons/bs";
import { BiChair, BiFridge } from "react-icons/bi";
import { LuMonitorCheck } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { Ri24HoursFill } from "react-icons/ri";
import { IoMdFlashlight } from "react-icons/io";

import EnrollmentBtn from "@/app/components/enrollmentBtn";

export const metadata = {
  title: "StudyNook – Details Rooms",
};

const fetchDetailsData = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function RoomsDetailsPage({ params }) {
  const { id } = await params;

  const room = await fetchDetailsData(id);

  if (!room) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-red-500">
            Room Not Found
          </h2>

          <p className="text-gray-500">
            Failed to load room details
          </p>
        </div>
      </div>
    );
  }

  const {
    roomImage,
    roomName,
    floor,
    seatCapacity,
    amenities = [],
    hourlyRate,
    enrollmentCount,
  } = room;

  const visibleAmenities = amenities.slice(0, 3);

  const amenityIcons = {
    WiFi: <FaWifi />,
    Projector: <BsProjector />,
    AC: <TbAirConditioning />,
    "Coffee Access": <MdOutlineCoffeeMaker />,
    Whiteboard: <FaChalkboard />,
    "Noise Cancellation": <MdNoiseAware />,
    "Smart TV": <FaTv />,
    "Charging Ports": <FaChargingStation />,
    "Premium Chairs": <BiChair />,
    "Mini Fridge": <BiFridge />,
    Monitor: <LuMonitorCheck />,
    Bookshelf: <GiBookshelf />,
    "24/7 Access": <Ri24HoursFill />,
    "Coffee Machine": <MdCoffeeMaker />,
    "Interactive Display": <MdDisplaySettings />,
    "Soft Lighting": <IoMdFlashlight />,
    Soundproof: <MdNoiseAware />,
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b pb-10">

        {/* LEFT SIDE */}
        <div>

          <img
            src={roomImage}
            alt={roomName}
            className="w-full h-[450px] rounded-3xl object-cover shadow-lg"
          />

          <div className="grid grid-cols-4 gap-3 mt-4">

            {[1, 2, 3, 4].map((item) => (
              <Image
                key={item}
                src={roomImage}
                alt="room"
                width={150}
                height={100}
                className="rounded-xl h-24 w-full object-cover hover:scale-105 duration-300"
              />
            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          <div className="flex items-center gap-3 flex-wrap">

            <h2 className="text-4xl font-bold">
              {roomName}
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
              Floor {floor}
            </span>

          </div>

          <div className="space-y-4 text-gray-700">

            <div className="flex justify-between border-b pb-3">
              <span className="font-medium">
                Capacity
              </span>

              <span>
                {seatCapacity} People
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-medium">
                Hourly Rate
              </span>

              <span>
                ${hourlyRate}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-medium">
                Total Booking
              </span>

              <span>
                {enrollmentCount || 0} Times
              </span>
            </div>

          </div>

          {/* AMENITIES */}
          <div className="flex flex-wrap gap-3">

            {visibleAmenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-green-700 text-green-700 px-3 py-2 rounded-xl text-sm font-medium"
              >
                {amenityIcons[item]}

                <span>{item}</span>
              </div>
            ))}

            {amenities.length > 3 && (
              <div className="flex items-center justify-center bg-gray-100 text-green-700 px-3 py-2 rounded-xl text-sm font-medium">
                +{amenities.length - 3}
              </div>
            )}

          </div>

          {/* DESCRIPTION */}
          <div>

            <h3 className="text-2xl font-semibold mb-3">
              About This Room
            </h3>

            <p className="text-gray-600 leading-7">
              This modern study room is designed for students and teams
              who need a quiet, comfortable, and productive workspace.
              Enjoy premium seating, smart facilities, and a peaceful
              environment for focused learning.
            </p>

          </div>

          {/* BUTTON */}
          <div className="pt-5">
            <EnrollmentBtn room={room} />
          </div>

        </div>

      </div>

      {/* FOOTER AMENITIES */}
      <div className="pt-10">

        <h2 className="text-3xl font-bold mb-6">
          Room Facilities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {amenities.map((item, index) => (
            <div
              key={index}
              className="border border-green-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-green-50 duration-300"
            >

              <div className="text-3xl text-green-700">
                {amenityIcons[item]}
              </div>

              <span className="text-sm font-semibold text-center text-gray-700">
                {item}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}