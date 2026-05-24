import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdEditCalendar } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";

const steps = [
  {
    id: 1,
    title: "Search Rooms",
    desc: "Find the perfect study room based on location, budget, and facilities.",
    icon: <FaSearch />,
  },
  {
    id: 2,
    title: "Book Instantly",
    desc: "Select your preferred time and book your room in just a few clicks.",
    icon: <MdEditCalendar />,
  },
  {
    id: 3,
    title: "Enjoy Study Time",
    desc: "Get access to a peaceful, distraction-free environment for productivity.",
    icon: <PiTargetBold />,
  },
  {
    id: 4,
    title: "Manage Easily",
    desc: "Track bookings, manage listings, and control everything from dashboard.",
    icon: <IoMdSettings />,
  },
];

const HowToWork = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          How It <span className="text-green-800">Works</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Simple steps to start your productive study journey
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300 bg-white dark:bg-zinc-700"
          >
            <div className="flex items-center justify-center text-4xl text-black mb-4">{step.icon}</div>

            <h3 className="text-lg font-semibold mb-2 dark:text-stone-50">
              {step.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToWork;