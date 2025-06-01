import React, { useState } from 'react';
import { Mail, MapPin, Star } from 'lucide-react';
import { mentorData } from '../../data/mentorData';
import { useAuth } from '../AuthContext';
import { useMentor } from '../../lib/hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import { getImageUrl } from '../../pages/admin/lib/utils';

const ProfileSection: React.FC = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useMentor(currentUser?.mentor_profile?.id);

  const [profile, setProfile] = useState(mentorData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-32 bg-linear-to-r from-orange-500 to-orange-600"></div>

            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={getImageUrl(data?.profilePhotoUrl)}
                    alt={currentUser?.fullname}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{currentUser?.fullname}</h2>

                <p className="mt-1 text-sm text-gray-600">{data?.skills.name}</p>

                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-800">{profile.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({profile.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-700">{currentUser?.email}</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-700">{data?.countryOfBirth}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Pricing</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Hourly Rate</span>
                <span className="text-xl font-semibold text-gray-900">रु{data?.hourly_rate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">About Me</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 whitespace-pre-line">{data?.introduction}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Expertise & Skills</h3>
            </div>
            <div className="p-6">
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2">Primary Expertise</h4>
                <p className="text-sm text-gray-700 mb-4">{data?.introduction}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Availability</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data?.availabilities.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-3">
                    <>
                      <div
                        className={`w-28 font-medium ${
                          slot.is_available ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {slot.day_of_week}
                      </div>
                      <div className={slot.is_available ? 'text-gray-700' : 'text-gray-400'}>
                        {slot.start_time} - {slot.end_time}
                      </div>
                      {!slot.is_available && (
                        <span className="ml-auto text-xs text-gray-500 italic">Inactive</span>
                      )}
                    </>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Your availability is shown in your local timezone ({profile.timezone}).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
