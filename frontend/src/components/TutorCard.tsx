import { Star } from 'lucide-react';
import { Button } from './ui/button/CustomButton';
import { MentorProfile } from '../services/users';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createConversation } from '../services/conversation';
import { useNavigate } from 'react-router-dom';

export default function TutorCard({ profile }: { profile: MentorProfile }) {
  const navigate = useNavigate();

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: ({ receiver_id }: { receiver_id: number }) => createConversation({ receiver_id }),
    onSuccess: (data: string) => {
      navigate('/messages/' + data);
    }
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex bg-white">
      {/* Left column - Tutor image */}
      <div className="w-64 mr-6">
        <div className="relative">
          <img
            src={profile.profilePhotoUrl}
            alt={profile.user.fullname}
            className="rounded-md w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Middle column - Tutor information */}
      <div className="flex-grow">
        {/* Tutor name and badges */}
        <div className="flex items-center mb-2">
          <h2 className="text-3xl font-bold mr-2">{profile.user.fullname}</h2>
        </div>

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
            <span className="text-lg">{profile.skills.name}</span>
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
            <span className="text-lg">{profile.introduction}</span>
          </div>
        </div>

        <div className="mt-4 text-md">
          <p>{profile.experience}</p>
        </div>
      </div>

      {/* Right column - Price, rating, and buttons */}
      <div className="flex flex-col items-end min-w-48">
        {/* Rating and Price in separate rows with better spacing */}
        <div className="flex flex-col w-full mb-6 space-y-4">
          {/* Rating */}
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <span className="text-3xl font-bold ml-2">5</span>
            <span className="text-gray-500 text-sm ml-2">(14 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <span className="text-gray-800 font-medium">Rs.</span>
            <span className="text-3xl font-bold ml-1">2000</span>
            <span className="text-gray-500 text-sm ml-2">/ 50 min</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3 mt-auto">
          <Link
            className="w-full bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded font-medium flex items-center justify-center border border-black cursor-pointer"
            to={"/send-booking-request?mentorId=" + profile.user.id}
          >
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
            Book
          </Link>

          <Button
            label="Send Message"
            color="light"
            onClick={() => {
              sendMessage({ receiver_id: profile.user.id });
            }}
          />
        </div>
      </div>
    </div>
  );
}
