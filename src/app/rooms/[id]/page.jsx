import Image from "next/image";
import { FaWifi, FaSnowflake, FaUsers, FaChalkboard, FaTv, FaChargingStation } from "react-icons/fa";
import {  MdCoffeeMaker, MdDisplaySettings, MdNoiseAware, MdOutlineCoffeeMaker } from "react-icons/md";
import { TbAirConditioning,  } from "react-icons/tb";
import { BsProjector } from "react-icons/bs";
import { BiChair, BiFridge } from "react-icons/bi";
import { LuMonitorCheck } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { Ri24HoursFill } from "react-icons/ri";
import { IoMdFlashlight } from "react-icons/io";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EnrollmentBtn from "@/app/components/enrollmentBtn";



export const metadata = {
  title: "StudyNook – Details Rooms",
};


const fetchDetailsData = async (id , token) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch room");
  }

  return res.json();
    
};

export default async function RoomsDetailsPage({ params }) {
    

    const { id } = await params; 
      const {token} = await auth.api.getToken({
        query: {
          disableCookieCache: true,
        },
        headers: await headers(),
      });
      console.log(token);


    const room = await fetchDetailsData(id , token);

    if (!room) {
    return <p>Loading...</p>;
    }
    const {_id, enrollmentCount ,roomImage, roomName , floor, seatCapacity, amenities, hourlyRate} = room;

    const visibleAmenities = room?.amenities?.slice(0, 3) || [];

    const amenityIcons = {
        WiFi: <FaWifi />,
        Projector: <BsProjector />,
        "AC" : <TbAirConditioning />,
        "Coffee Access" : <MdOutlineCoffeeMaker />,
        Whiteboard : <FaChalkboard />,
        "Noise Cancellation":<MdNoiseAware />,
        "Smart TV" : <FaTv />,
        "Charging Ports" : <FaChargingStation />,
        "Premium Chairs" : <BiChair />,
        "Mini Fridge" :<BiFridge />,
        Monitor : <LuMonitorCheck />,
        Bookshelf : <GiBookshelf />,
        "24/7 Access" :<Ri24HoursFill />,
        "Coffee Machine" : <MdCoffeeMaker />,
        "Interactive Display" : <MdDisplaySettings />,
        "Soft Lighting" : <IoMdFlashlight />,
        Soundproof : <MdNoiseAware />


    };

    return (
 <div className="max-w-5xl mx-auto px-5 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b pb-7 ">

        {/* left side */}
        <div>

        {room.roomImage && (
        <img
          src={room.roomImage}
          alt={room.roomName}
          className="w-full h-[450px] rounded-2xl object-cover transition-all duration-300 hover:translate-y-1"
        />
        )}

          {/* left small images */}
          <div className="grid grid-cols-4 gap-3 mt-4 ">

            <Image
              src={roomImage}
              alt="small img"
              width={150}
              height={100}
              className="rounded-xl h-24 object-cover transition-all duration-300 hover:translate-x-1 "
            />

            <Image
              src={roomImage}
              alt="small img"
              width={150}
              height={100}
              className="rounded-xl h-24 object-cover transition-all duration-300 hover:translate-x-1"
            />

            <Image
              src={roomImage}
              alt="small img"
              width={150}
              height={100}
              className="rounded-xl h-24 object-cover transition-all duration-300 hover:translate-x-1"
            />

            <Image
              src={roomImage}
              alt="small img"
              width={150}
              height={100}
              className="rounded-xl h-24 object-cover transition-all duration-300 hover:translate-x-1"
            />

          </div>

        </div>

        {/* right side */}
        <div className="space-y-4 mt-3">

          <div className="flex items-center gap-2">

            <h2 className="text-4xl font-bold">
              {roomName}
            </h2>

            <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm transition-all duration-300 hover:translate-y-1 cursor-pointer">
               {floor}
            </span>

          </div>

          <div className="space-y-3 text-gray-700">

            <div className="flex justify-between border-b pb-3">
              <span>Capacity</span>
              <span>{seatCapacity} People</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Hourly Rate</span>
              <span>{hourlyRate}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Booking Count</span>
              <span>24 Times</span>
            </div>

          </div>

          {/* amenities */}
  <div className="flex flex-wrap gap-3">
    {
      visibleAmenities.map((item, index) => (

        <div
          key={index}
          className="flex items-center gap-1 border border-green-800 px-2 py-1 rounded-xl text-sm text-green-800 font-semibold"
        >

          <span className="font-sm">{item}</span>

        </div>

      ))
    }

    {/* remaining count */}
    {
      room.amenities?.length > 3 && (

        <div className="flex items-center justify-center border border-green-800 px-2 py-1 rounded-xl bg-gray-100 font-sm text-green-800">

          +{room.amenities.length - 3}

        </div>

      )
    }

  </div>

          {/* description */}
          <div>

            <h3 className="text-xl font-semibold mb-3">
              About This Room
            </h3>

            <p className="text-gray-600 leading-7">
              Designed for students who prefer a calm and modern environment with natural light and comfortable seating.
            </p>

          </div>

          {/* buttons */}
          <div className="flex gap-4 pt-5 cursor-pointer">

            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl cursor-pointer"
            > */}
              {/* Book Now */}
              <EnrollmentBtn room={room}></EnrollmentBtn>
              
            {/* </button> */}

            {/* <button className="border border-green-800 text-green-800 hover:bg-green-700 hover:text-white px-6 py-3 rounded-xl cursor-pointer">
              Save Room
            </button> */}

          </div>

        </div>

      </div>

        {/* footer side */}
      <div className="flex gap-5 pt-10">
    {
      amenities.map((item, index) => (

        <div
          key={index}
          className="flex flex-col items-center border border-green-800 px-5 py-5 rounded-md text-sm text-green-800 font-semibold"
        >
            {amenityIcons[item]}
          <span className="font-sm">{item}</span>

        </div>

      ))
    }
      </div>

    </div>
    );
}