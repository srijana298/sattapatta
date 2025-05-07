import { Star, Play, Info, MessageSquare, Smile, Gauge, ClipboardCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function TutorProfile() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white pb-10 flex flex-col md:flex-row gap-6">
        <div className="md:flex-1">
          {/* Tutor Header */}
          <div className="flex items-start gap-4 mb-10 pt-6">
            <div className="w-24 h-24 rounded overflow-hidden relative">
              <img
                src="https://randomuser.me/api/portraits/women/57.jpg"
                alt="Laura"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Laura P.</h1>
                <span className="text-2xl">🇪🇸</span>
              </div>
              <p className="text-gray-700 mb-4">
                Experienced English teacher with 10 years of experience
              </p>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Teaches</div>
                  <div className="text-gray-600">English lessons</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-2">About me</h2>
            <p className="text-gray-700 mb-1">
              Hello, my name is Laura! I'm delighted to share a bit more about myself. As an
              experienced English teacher with a decade-long journey spanning Spain, Ireland, and
              now Sydney, Australia, teaching isn't just a job for me; it's my passion. Over the
              years, I've had the privilege of guiding young learners, teens, and adults on their
              English learning journey, tailoring my approach to suit their individual needs.
              Whether it's General English, IELTS, or my beloved Cambridge courses, I bring
            </p>
            <button className="text-blue-600 font-medium">Show more</button>
          </div>

          {/* I speak Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">I speak</h2>
            <div className="flex gap-2">
              <div className="flex items-center">
                <span className="bg-gray-100 py-1 px-3 rounded-md text-sm">Spanish</span>
                <span className="bg-blue-100 py-1 px-3 rounded-md text-sm ml-1">Native</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 py-1 px-3 rounded-md text-sm">English</span>
                <span className="bg-blue-100 py-1 px-3 rounded-md text-sm ml-1">Proficient C2</span>
              </div>
            </div>
          </div>

          {/* Lesson Rating Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Lesson rating</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Reassurance</div>
                </div>
                <Smile className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Clarity</div>
                </div>
                <MessageSquare className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Progress</div>
                </div>
                <Gauge className="text-gray-600" size={24} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">5.0</div>
                  <div className="text-gray-600 text-sm">Preparation</div>
                </div>
                <ClipboardCheck className="text-gray-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-4 gap-1 text-gray-600 text-sm">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
              <span>Based on 3 anonymous student reviews</span>
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                What my students say
                <Info size={16} className="ml-1 text-gray-400" />
              </h2>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="text-4xl font-bold">5</div>
              <div className="text-2xl">⭐</div>
            </div>

            <div className="text-sm text-gray-600 mb-6">Based on 3 student reviews</div>

            {/* Review 1 */}
            <div className="mb-8 border-b pb-6">
              <div className="flex gap-4 mb-3">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Andrea"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Andrea</div>
                  <div className="text-gray-500 text-sm">April 22, 2025</div>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-black fill-black" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                I have been working with Laura for a month now and she has adapted very well to my
                needs. She explains clearly and her classes are very enjoyable!!
              </p>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
                Show original
              </button>
            </div>

            {/* Review 2 */}
            <div className="mb-8 border-b pb-6">
              <div className="flex gap-4 mb-3">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Jordi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Jordi</div>
                  <div className="text-gray-500 text-sm">March 18, 2025</div>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-black fill-black" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                Super professional! He adapts to you and makes the classes completely personalized
                to your needs.
              </p>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
                Show original
              </button>
            </div>

            {/* Review 3 */}
            <div className="mb-8">
              <div className="flex gap-4 mb-3">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Sandra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">Sandra</div>
                  <div className="text-gray-500 text-sm">October 23, 2024</div>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-black fill-black" />
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                Laura understands and analyzes the student's level of English, making learning
                easier. She inspires confidence and shows interest in improving the language.
                Without a doubt, a very good teacher for discussing everyday topics and
                understanding English in depth.
              </p>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
                Show original
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img
              src="/api/placeholder/400/200"
              alt="Video thumbnail"
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-pink-500 rounded-full p-2">
                <Play size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side UI */}
        <div className="md:w-80">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            {/* Video Preview */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src="/api/placeholder/400/300"
                alt="Video thumbnail"
                className="w-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <div className="bg-pink-300 rounded-full p-4">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" className="fill-black"></polygon>
                  </svg>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-center">
                <div className="flex items-center text-2xl font-bold">
                  <span className="text-black">★</span>
                  <span>5</span>
                </div>
                <div className="text-gray-500">3 reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">97</div>
                <div className="text-gray-500">lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$20</div>
                <div className="text-gray-500">50-min lesson</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 px-4 rounded-full font-medium flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Book trial lesson
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-black py-3 px-4 rounded-full font-medium border flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Send message
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-black py-3 px-4 rounded-full font-medium border flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Save to my list
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-black py-3 px-4 rounded-full font-medium border flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share tutor
              </button>
            </div>

            {/* Free Switch Banner */}
            <div className="bg-green-50 rounded-lg p-4 mb-6 flex">
              <div className="relative mr-4">
                <img
                  src="https://randomuser.me/api/portraits/women/57.jpg"
                  alt="Laura"
                  className="rounded-md"
                />
                <div className="absolute -bottom-2 left-0 right-0 bg-white text-center py-1 text-sm font-medium">
                  Free switch
                </div>
              </div>
              <div>
                <p className="text-gray-800 text-lg">
                  If Laura P. isn't a match, get 2 more free trials to find the right tutor.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                <div>
                  <div className="font-medium">Popular</div>
                  <div className="text-gray-500 text-sm">
                    4 lesson bookings in the last 48 hours
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <div className="font-medium">Usually responds in 2 hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
