import React from 'react';

const WhatStudentSay = () => {
    return (
        <div>
<section className="max-w-5xl mx-auto my-20 px-4">

  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold">
      What Students <span className="text-green-700">Say</span>
    </h2>

    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
      Thousands of students use StudyNook to find their ideal
      study environment.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://i.ibb.co.com/FkSYHFjc/360-F-560706812-0-GNEvn3tqo6-OVQt-E0-JIvlw-Zx8fu6-S2-SR.jpg"
          alt="student"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">Sarah Ahmed</h3>
          <p className="text-sm text-gray-500">
            University Student
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-7 text-sm">
        “StudyNook helped me find the perfect quiet room before
        my exams. Super easy booking process!”
      </p>

      <div className="mt-4 text-yellow-500">
        ⭐⭐⭐⭐⭐
      </div>
    </div>

    <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://i.ibb.co.com/Hy7Bj19/portrait-student-boy-23-2147668972.jpg"
          alt="student"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">Rahim Hossain</h3>
          <p className="text-sm text-gray-500">
            Engineering Student
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-7 text-sm">
        “The rooms are clean, affordable, and equipped with
        everything needed for group study.”
      </p>

      <div className="mt-4 text-yellow-500">
        ⭐⭐⭐⭐⭐
      </div>
    </div>

    <div className="border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://i.ibb.co.com/pBB2RW8g/student-PNG127.png"
          alt="student"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">Nusrat Jahan</h3>
          <p className="text-sm text-gray-500">
            Medical Student
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-7 text-sm">
        “I love the peaceful atmosphere and fast WiFi. It really
        improves my productivity.”
      </p>

      <div className="mt-4 text-yellow-500">
        ⭐⭐⭐⭐
      </div>
    </div>

  </div>
</section>
        </div>
    );
}

export default WhatStudentSay;
