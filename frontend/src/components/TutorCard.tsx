import { Heart, Star, Shield, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button/CustomButton';

export default function TutorCard() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex bg-white">
      {/* Left column - Tutor image */}
      <div className="w-64 mr-6">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/men/50.jpg"
            alt="Mitchell T."
            className="rounded-md w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-teal-500 w-6 h-6 rounded"></div>
        </div>
      </div>

      {/* Middle column - Tutor information */}
      <div className="flex-grow">
        {/* Tutor name and badges */}
        <div className="flex items-center mb-2">
          <h2 className="text-3xl font-bold mr-2">Mitchell T.</h2>
          <Shield size={20} className="text-gray-800 mr-2" />
          <span className="text-lg">🇿🇦</span>
        </div>

        {/* Professional badge */}
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-md text-sm font-medium">
            Professional
          </span>
        </div>

        {/* Tutor details */}
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10L12 5L3 10L12 15L21 10ZM21 10V14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14V10M12 15V19M7 12.5V17.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg">English</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4 18C4 15.7909 5.79086 14 8 14H16C18.2091 14 20 15.7909 20 18V20H4V18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-lg">48 active students • 7,022 lessons</span>
          </div>

          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-lg">Speaks English (Native), French (Pre-Intermediate)</span>
          </div>
        </div>

        <div className="mt-4 text-md ">
          <p>
            Patient | Certified Tutor | Business English | General English | Kids English | IELTS
            Coach | TOEIC Coach — Hello, I am Mitchell <span className="inline-block">👋</span>. and
            thank you for visiting my
          </p>
          <button className="text-gray-900 font-semibold underline mt-1">Read more</button>
        </div>
      </div>

      {/* Right column - Price, rating, and buttons */}
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-5 w-full mb-1">
          <div className="flex-col">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-black fill-current" />
              <span className="text-3xl font-bold ml-1">5</span>
            </div>
            <span className="text-gray-500 text-sm">14 reviews</span>
          </div>
          <div className="flex-col">
            <div className="flex items-center">
              Rs.<span className="text-3xl font-bold ml-1">2000</span>
            </div>
            <span className="text-gray-500 text-sm">50min lessons</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3 mt-auto">
          <Button label="Send Message" color="orange" />
        </div>
      </div>
    </div>
  );
}
