import React, { useState } from 'react';
import { Clock, DollarSign, Star, Users, Calendar, Check } from 'lucide-react';

export default function MentorPricingPage() {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [packageRates, setPackageRates] = useState({
    trial: 15,
    package5: 22,
    package10: 20
  });
  const [selectedSubjects, setSelectedSubjects] = useState(['JavaScript', 'React']);
  const [availability, setAvailability] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const subjects = [
    'JavaScript',
    'React',
    'Python',
    'Node.js',
    'CSS',
    'HTML',
    'TypeScript',
    'Vue.js',
    'Angular',
    'Express.js',
    'MongoDB',
    'SQL'
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const toggleAvailability = (day, time) => {
    const key = `${day}-${time}`;
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const steps = [
    { number: 1, title: 'Set Your Rates', icon: DollarSign },
    { number: 2, title: 'Choose Subjects', icon: Star },
    { number: 3, title: 'Set Availability', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">TeachConnect</span>
            </div>
            <div className="text-sm text-gray-500">Step {currentStep} of 3</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-orange-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Set your rates</h2>
              <p className="text-gray-600 mb-8">
                Choose competitive rates to attract more students
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Rate Setting */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Hourly rate for 1-on-1 lessons
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg font-semibold"
                        min="5"
                        max="200"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        /hour
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Minimum: $5</span>
                      <span>Maximum: $200</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Trial lesson (30 min)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={packageRates.trial}
                        onChange={(e) =>
                          setPackageRates((prev) => ({ ...prev, trial: Number(e.target.value) }))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        5-lesson package
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          value={packageRates.package5}
                          onChange={(e) =>
                            setPackageRates((prev) => ({
                              ...prev,
                              package5: Number(e.target.value)
                            }))
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">per lesson</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        10-lesson package
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          value={packageRates.package10}
                          onChange={(e) =>
                            setPackageRates((prev) => ({
                              ...prev,
                              package10: Number(e.target.value)
                            }))
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">per lesson</p>
                    </div>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    How students will see your rates
                  </h3>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Your Profile</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          4.9 (127 reviews)
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Trial lesson (30 min)</span>
                        <span className="font-semibold text-orange-600">${packageRates.trial}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">1-on-1 lesson</span>
                        <span className="font-semibold text-gray-800">${hourlyRate}/hour</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">5-lesson package</span>
                        <span className="font-semibold text-green-600">
                          ${packageRates.package5}/lesson
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">10-lesson package</span>
                        <span className="font-semibold text-green-600">
                          ${packageRates.package10}/lesson
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">What do you teach?</h2>
              <p className="text-gray-600 mb-8">Select the subjects you're qualified to teach</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSubjects.includes(subject)
                        ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Selected subjects ({selectedSubjects.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Set your availability</h2>
              <p className="text-gray-600 mb-8">Choose when you're available to teach students</p>

              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    <div className="p-2"></div>
                    {weekDays.map((day) => (
                      <div key={day} className="p-2 text-center">
                        <div className="font-semibold text-gray-700 text-sm">{day.slice(0, 3)}</div>
                      </div>
                    ))}
                  </div>

                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                      <div className="p-2 text-sm text-gray-600 font-medium">{time}</div>
                      {weekDays.map((day) => {
                        const key = `${day}-${time}`;
                        const isSelected = availability[key];
                        return (
                          <button
                            key={key}
                            onClick={() => toggleAvailability(day, time)}
                            className={`p-2 rounded border transition-all ${
                              isSelected
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                            }`}
                          >
                            <Clock className="w-4 h-4 mx-auto" />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Pro tip</h4>
                <p className="text-blue-700 text-sm">
                  Teachers with more availability get 3x more lesson requests. You can always update
                  your schedule later.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
