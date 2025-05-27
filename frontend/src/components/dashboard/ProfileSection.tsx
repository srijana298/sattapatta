import React, { useState } from 'react';
import {
  Edit,
  Mail,
  MapPin,
  Star,
  Save,
  Camera
} from 'lucide-react';
import { mentorData } from '../../data/mentorData';
import { useAuth } from '../AuthContext';
import { useMentor } from '../../lib/hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import { getImageUrl } from '../../pages/admin/lib/utils';


const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useAuth();
  const { data, isLoading } = useMentor(currentUser?.mentor_profile?.id);

  const [profile, setProfile] = useState(mentorData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes logic would go here in a real app
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
        <button
          onClick={handleEditToggle}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-sm 
                   transition-colors duration-150 ease-in-out ${
                     isEditing
                       ? 'bg-green-500 hover:bg-green-600 text-white'
                       : 'bg-orange-500 hover:bg-orange-600 text-white'
                   }`}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-32 bg-linear-to-r from-orange-500 to-orange-600">
              {isEditing && (
                <button
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm 
                                text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={getImageUrl(data?.profilePhotoUrl)}
                    alt={currentUser?.fullname}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                  {isEditing && (
                    <button
                      className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full 
                                    text-white hover:bg-orange-600 focus:outline-none"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="text-center block w-full text-lg font-semibold text-gray-800 border-gray-300 
                             rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-800">{currentUser?.fullname}</h2>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    name="expertise"
                    value={profile.expertise}
                    onChange={handleInputChange}
                    className="text-center block w-full mt-1 text-sm text-gray-600 border-gray-300 
                             rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-600">{data?.skills.name}</p>
                )}

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

                {/* <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-700">Member since {profile.memberSince}</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Pricing</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Hourly Rate</span>
                <span className="text-xl font-semibold text-gray-900">₹{data?.hourly_rate}</span>
              </div>

              {isEditing && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Discount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="packageDiscount"
                      value={profile.packageDiscount || 0}
                      onChange={handleInputChange}
                      className="block w-full pr-7 text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Discount applied when students book 5+ sessions
                  </p>
                </div>
              )}
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

          {/* Expertise Section */}
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

          {/* Availability Section */}
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
                          slot.is_available? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {slot.day_of_week}
                      </div>
                      <div className={slot.is_available? 'text-gray-700' : 'text-gray-400'}>
                        {slot.start_time} - {slot.end_time}
                      </div>
                      {!slot.is_available&& (
                        <span className="ml-auto text-xs text-gray-500 italic">Inactive</span>
                      )}
                    </>
                  </div>
                ))}

              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Your availability is shown in your local timezone ({profile.timezone}).
                  {isEditing && ' Students will see times converted to their timezone.'}
                </p>

                {isEditing && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      name="timezone"
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
