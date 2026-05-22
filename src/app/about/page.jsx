import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero Section */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          About <span className="text-green-700">StudyNook</span>
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          A modern platform for finding and booking peaceful study rooms to
          boost productivity and focus.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Left text */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            StudyNook is built to help students, freelancers, and professionals
            find distraction-free environments for deep focus and productivity.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            We believe that the right environment can significantly improve
            learning and performance. That’s why we provide easy access to
            well-equipped study spaces.
          </p>

          <p className="text-gray-600 leading-relaxed">
            From booking to managing rooms, everything is designed to be fast,
            simple, and user-friendly.
          </p>
        </div>

        {/* Right card */}
        <div className="grid gap-4">

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-green-700">
              🎯 Focus Driven
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Designed for maximum productivity and concentration.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-green-700">
              ⚡ Fast Booking
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Book study rooms in just a few clicks.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-green-700">
              🔒 Secure System
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Safe authentication and booking system.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800">
          Start your productive journey today
        </h2>

        <p className="text-gray-500 mt-2">
          Find and book the perfect study space in seconds.
        </p>

            <Link href={"/allRooms"}
            className="flex justify-center py-5"
            >
            <button className="flex items-center text-center gap-1 font-medium text-[12px] border rounded-sm py-2 px-2 bg-green-800 text-white hover:bg-green-500 hover:scale-105 transition-transform duration-300 cursor-pointer ">
                Explore Rooms
                <FaArrowRight className="h-[10px]" />
            </button>
            </Link>
      </div>

    </div>
  );
};

export default AboutPage;

