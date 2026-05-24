import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn } from 'react-icons/ci';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='bg-green-900 rounded-md dark:bg-stone-800'>

        <div className=' md:flex justify-around px-14 md:px-20 py-10 '>


            <div className="flex flex-col gap-4 justify-center">
                {/* logo side */}
            <div className="">

                <div className="flex items-center">
                    <div className="w-[70px]">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <h2 className="font-extrabold text-2xl text-gray-800 dark:text-stone-50">StudyNook</h2>

                </div>

                <div>
                    <p className='text-gray-400 text-[12px] font-medium'>StudyNook helps students find and book <br /> study rooms easily for focused learning.</p>
                </div>

                                    {/* social links */}
            <div className='text-gray-400 mt-3'>

                <div className="flex items-center gap-4 ">
                {[
                  {
                    alt: "FaceBook",
                    src: "/fb.jfif",
                    link: "https://www.facebook.com/samsun.srity",
                  },
                  {
                    alt: "Twitter",
                    src: "/x.jfif",
                    link: "https://twitter.com/in/samsunnahar",
                  },
                  {
                    alt: "LinkedIn",
                    src: "/linkedin.png",
                    link: "https://linkedin.com/in/samsunnahar",
                  },
                  {
                    alt: "Instagram",
                    src: "/insta.jfif",
                    link: "https://instagram.com/in/Sweetsparkles332",
                  },
                ].map((social, idx) => (
                  <div key={idx}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 rounded-full  hover:text-brand-primary transition-all duration-300"
                    >
                      <Image
                        alt={social.alt}
                        width={24}
                        height={24}
                        src={social.src}
                        className="w-5 h-5 rounded-full object-cover hover:scale-125 transition-transform"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            </div>
            </div>


                            {/* Useful links */}

            <div className='text-gray-400 space-y-4 mt-5 '>
                    <div className='font-semibold text-gray-300'>
                        <h2>Useful links</h2>
                    </div>
                <div className='text-[10px] grid gap-1 '>

                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                Home
                </Link>
                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                Rooms
                </Link>
                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                About
                </Link>
                <Link href="/" 
                className="className='font-medium text-gray-400 hover:text-green-500">
                How It Works
                </Link>

                </div>
                
            </div> 

                            {/* for user login links */}

            <div className='text-gray-400 space-y-4 mt-5 '>
                    <div className='font-semibold text-gray-300'>
                        <h2>For User</h2>
                    </div>
                <div className='text-[10px] grid gap-1 '>

                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                Home
                </Link>
                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                Rooms
                </Link>
                <Link href="/" 
                className="font-medium text-gray-400 hover:text-green-500">
                Add Rooms
                </Link>
                <Link href="/" 
                className="className='font-medium text-gray-400 hover:text-green-500">
                My Listings
                </Link>
                <Link href="/" 
                className="className='font-medium text-gray-400 hover:text-green-500">
                My Bookings
                </Link>

                </div>
                
            </div> 
            
                            {/* contact us */}
            <div className='text-gray-400 space-y-4 mt-5 '>
                <h2 className='font-semibold text-gray-300'>Contact Us</h2>

                <p className='text-[10px] flex items-center gap-1'>
                    <span className='text-[15px] text-white-300'><MdOutlineEmail /></span>
                    samsunnaharsrity@gmail.com
                </p>
                <p className='text-[10px] flex items-center gap-1'>
                    <span className='text-[15px] text-white-300'><MdOutlinePhone /></span>
                    +880 1872072303
                </p>
                <p className='text-[10px] flex items-center gap-1'>
                    <span className='text-[15px] text-white-300'><CiLocationOn /></span>
                    Dhaka,Bangladesh
                </p>
            </div>  

           
        </div>

        <p className='border-t border-gray-700 py-3'>
            <span className='text-gray-400 flex justify-center text-[8px]'>
                © {new Date().getFullYear()} StudyNook- All right reserved
            </span>
        </p>
        </div>
    );
}

export default Footer;
