"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >

        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-7xl font-bold text-green-700"
        >
          404
        </motion.h1>

        <h2 className="text-2xl font-semibold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-2">
          The page you are looking for doesn’t exist.
        </p>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl my-6"
        >
          📚
        </motion.div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="bg-green-700 text-white px-5 py-2 rounded-full"
          >
            Go Home
          </Link>

          <Link
            href="/allRooms"
            className="border border-green-700 text-green-700 px-5 py-2 rounded-full"
          >
            Browse Rooms
          </Link>
        </div>

      </motion.div>
    </div>
  );
}