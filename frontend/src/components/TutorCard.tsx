import { Star, MessageCircle, Calendar, MapPin } from 'lucide-react';
import { MentorProfile } from '../services/users';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createConversation } from '../services/conversation';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../pages/admin/lib/utils';

export default function TutorCard({ profile }: { profile: MentorProfile }) {
  const navigate = useNavigate();

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: ({ receiver_id }: { receiver_id: number }) => createConversation({ receiver_id }),
    onSuccess: (data: string) => {
      navigate('/messages/' + data);
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="md:flex">
        {/* Profile Image Section */}
        <div className="md:w-72 shrink-0">
          <div className="relative h-64 md:h-full">
            <img
              src={getImageUrl(profile.profilePhotoUrl)}
              alt={profile.user.fullname}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {profile.skills.name}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    <Link to={'/mentors/' + profile.id} className="hover:underline">
                      {profile.user.fullname}
                    </Link>
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">4.9</span>
                      <span className="text-sm ml-1">(24 reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{profile.countryOfBirth} </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">₹{profile.hourly_rate}</div>
                  <div className="text-sm text-gray-500">per hour</div>
                </div>
              </div>

              {/* Introduction */}
              <div className="mb-4">
                <p className="text-gray-700 text-lg leading-relaxed line-clamp-2">
                  {profile.introduction}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{profile.experience}</p>
              </div>

              {/* Key Stats */}
              {/* <div className="grid grid-cols-3 gap-4 mb-6 py-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Years Exp.</div>
                </div>
                <div className="text-center border-l border-gray-200">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Response</div>
                </div>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                to={'/send-booking-request?mentorId=' + profile.user.id}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Session
              </Link>

              <button
                onClick={() => sendMessage({ receiver_id: profile.user.id })}
                className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>

            {/* Trust Indicators */}
          </div>
        </div>
      </div>
    </div>
  );
}
