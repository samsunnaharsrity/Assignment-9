import React from 'react';
import { FaBolt } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import { TbMoneybag } from 'react-icons/tb';
import { TfiWorld } from 'react-icons/tfi';

const ChooseStudyNook = () => {
    return (
        <div>
<section className="max-w-5xl mx-auto my-20 px-4">
  
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold">
      Why Choose <span className="text-green-700">StudyNook?</span>
    </h2>

    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
      Discover comfortable and affordable study spaces designed
      to help students stay productive and focused.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
        <ImBooks className='text-green-600'/>
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Quiet Environment
      </h3>

      <p className="text-gray-500 text-sm leading-6">
        Enjoy distraction-free rooms designed for deep focus and
        productive study sessions.
      </p>
    </div>

    <div className="border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
        <FaBolt  className='text-yellow-600 '/>
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Fast Booking
      </h3>

      <p className="text-gray-500 text-sm leading-6">
        Book study rooms instantly with a smooth and simple
        reservation process.
      </p>
    </div>

    <div className="border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
        <TbMoneybag className='text-yellow-600' />
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Affordable Pricing
      </h3>

      <p className="text-gray-500 text-sm leading-6">
        Flexible hourly pricing that fits every student's budget
        without compromising quality.
      </p>
    </div>

    <div className="border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
        <TfiWorld className='text-blue-600' />
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Premium Amenities
      </h3>

      <p className="text-gray-500 text-sm leading-6">
        Access high-speed WiFi, projectors, whiteboards, AC,
        and more.
      </p>
    </div>

  </div>
</section>
        </div>
    );
}

export default ChooseStudyNook;
