import React, { useState } from 'react';
import { User, Edit, Clock, Calendar, Mail, Phone, Globe, MapPin, Star, Save, X, Camera } from 'lucide-react';
import { mentorData } from '../../data/mentorData';

interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mentorData);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '12:00', isActive: true },
    { id: '2', day: 'Monday', startTime: '13:00', endTime: '17:00', isActive: true },
    { id: '3', day: 'Tuesday', startTime: '09:00', endTime: '15:00', isActive: true },
    { id: '4', day: 'Wednesday', startTime: '10:00', endTime: '14:00', isActive: true },
    { id: '5', day: 'Thursday', startTime: '09:00', endTime: '12:00', isActive: true },
    { id: '6', day: 'Friday', startTime: '13:00', endTime: '18:00', isActive: true },
  ]);
  
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
      [name]: value,
    });
  };
  
  const handleAvailabilityChange = (id: string, field: string, value: string | boolean) => {
    setAvailability(
      availability.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };
  
  const addAvailabilitySlot = () => {
    const newSlot: AvailabilitySlot = {
      id: `new-${Date.now()}`,
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      isActive: true,
    };
    setAvailability([...availability, newSlot]);
  };
  
  const removeAvailabilitySlot = (id: string) => {
    setAvailability(availability.filter((slot) => slot.id !== id));
  };

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
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-32 bg-linear-to-r from-orange-500 to-orange-600">
              {isEditing && (
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm 
                                text-gray-700 hover:text-gray-900 focus:outline-none">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-1.5 bg-orange-500 rounded-full 
                                    text-white hover:bg-orange-600 focus:outline-none">
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
                  <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
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
                  <p className="mt-1 text-sm text-gray-600">{profile.expertise}</p>
                )}
                
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-800">{profile.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({profile.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profile.email}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-700">{profile.location}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <a href={profile.website} className="text-sm text-orange-600 hover:underline">
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-700">Member since {profile.memberSince}</span>
                </div>
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
                {isEditing ? (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={profile.hourlyRate.toString().replace(/^\$/, '')}
                      onChange={handleInputChange}
                      className="pl-7 block w-full text-sm text-right text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                ) : (
                  <span className="text-xl font-semibold text-gray-900">${profile.hourlyRate}</span>
                )}
              </div>
              
              <div className="space-y-3">
                {['30-min session', '60-min session', '90-min session'].map((session, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{session}</span>
                    <span className="text-sm font-medium text-gray-800">
                      ${(profile.hourlyRate * (index + 1) * 0.5).toFixed(2)}
                    </span>
                  </div>
                ))}
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
        
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">About Me</h3>
            </div>
            <div className="p-6">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows={6}
                  className="block w-full text-sm text-gray-700 border-gray-300 
                           rounded-md focus:ring-orange-500 focus:border-orange-500"
                />
              ) : (
                <p className="text-sm text-gray-700 whitespace-pre-line">{profile.bio}</p>
              )}
            </div>
          </div>
          
          {/* Expertise Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Expertise & Skills</h3>
            </div>
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Expertise
                    </label>
                    <input
                      type="text"
                      name="primaryExpertise"
                      value={profile.primaryExpertise}
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={profile.skills.join(', ')}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          skills: e.target.value.split(',').map(skill => skill.trim()),
                        });
                      }}
                      className="block w-full text-sm text-gray-700 border-gray-300 
                               rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Primary Expertise</h4>
                  <p className="text-sm text-gray-700 mb-4">{profile.primaryExpertise}</p>
                  
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                 bg-orange-100 text-orange-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Availability Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Availability</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {availability.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-3">
                    {isEditing ? (
                      <>
                        <select
                          value={slot.day}
                          onChange={(e) => handleAvailabilityChange(slot.id, 'day', e.target.value)}
                          className="block w-32 text-sm text-gray-700 border-gray-300 
                                   rounded-md focus:ring-orange-500 focus:border-orange-500"
                        >
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => handleAvailabilityChange(slot.id, 'startTime', e.target.value)}
                          className="block w-24 text-sm text-gray-700 border-gray-300 
                                   rounded-md focus:ring-orange-500 focus:border-orange-500"
                        />
                        
                        <span className="text-gray-500">to</span>
                        
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => handleAvailabilityChange(slot.id, 'endTime', e.target.value)}
                          className="block w-24 text-sm text-gray-700 border-gray-300 
                                   rounded-md focus:ring-orange-500 focus:border-orange-500"
                        />
                        
                        <div className="flex items-center space-x-2 ml-auto">
                          <button
                            onClick={() => handleAvailabilityChange(
                              slot.id, 
                              'isActive', 
                              !slot.isActive
                            )}
                            className={`relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent 
                                     rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                                     ${slot.isActive ? 'bg-orange-500' : 'bg-gray-200'}`}
                          >
                            <span className={`pointer-events-none inline-block h-5 w-5 rounded-full 
                                           bg-white shadow transform ring-0 transition ease-in-out duration-200
                                           ${slot.isActive ? 'translate-x-5' : 'translate-x-0'}`} 
                            />
                          </button>
                          
                          <button
                            onClick={() => removeAvailabilitySlot(slot.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`w-28 font-medium ${slot.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {slot.day}
                        </div>
                        <div className={slot.isActive ? 'text-gray-700' : 'text-gray-400'}>
                          {slot.startTime} - {slot.endTime}
                        </div>
                        {!slot.isActive && (
                          <span className="ml-auto text-xs text-gray-500 italic">Inactive</span>
                        )}
                      </>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button
                    onClick={addAvailabilitySlot}
                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 
                             shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white 
                             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-orange-500"
                  >
                    + Add Time Slot
                  </button>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Your availability is shown in your local timezone ({profile.timezone}).
                  {isEditing && ' Students will see times converted to their timezone.'}
                </p>
                
                {isEditing && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
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
          
          {/* Calendar Integration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Calendar Integration</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Google Calendar</p>
                    <p className="text-xs text-gray-500">
                      {profile.calendarConnected 
                        ? `Connected to ${profile.email}` 
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                
                <button 
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 
                           ${profile.calendarConnected 
                             ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                             : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                >
                  {profile.calendarConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
              
              {profile.calendarConnected && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="auto-sync"
                      checked={profile.calendarAutoSync}
                      onChange={(e) => setProfile({ 
                        ...profile, 
                        calendarAutoSync: e.target.checked 
                      })}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-sync" className="ml-2 text-sm text-gray-700">
                      Automatically sync new bookings to my calendar
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="check-conflicts"
                      checked={profile.calendarCheckConflicts}
                      onChange={(e) => setProfile({ 
                        ...profile, 
                        calendarCheckConflicts: e.target.checked 
                      })}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="check-conflicts" className="ml-2 text-sm text-gray-700">
                      Check for conflicts when students book sessions
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;