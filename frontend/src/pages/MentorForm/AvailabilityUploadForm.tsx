import { useState } from 'react';

const AvailabilityUploadForm = () => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ];

  // State to track selected time slots
  const [availability, setAvailability] = useState(() => {
    const initial = {};
    weekdays.forEach((day) => {
      initial[day] = {};
      timeSlots.forEach((time) => {
        initial[day][time] = false;
      });
    });
    return initial;
  });

  // State for time zone
  const [timezone, setTimezone] = useState('UTC');

  // Toggle time slot selection
  const toggleTimeSlot = (day, time) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time]
      }
    }));
  };

  // Handle timezone change
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  // Check if a time range is selected for a specific day
  const hasTimeSelected = (day) => {
    return Object.values(availability[day]).some((value) => value);
  };

  // Quick select options
  const selectAllDay = (day) => {
    setAvailability((prev) => {
      const updatedDay = {};
      timeSlots.forEach((time) => {
        updatedDay[time] = true;
      });

      return {
        ...prev,
        [day]: updatedDay
      };
    });
  };

  const clearDay = (day) => {
    setAvailability((prev) => {
      const updatedDay = {};
      timeSlots.forEach((time) => {
        updatedDay[time] = false;
      });

      return {
        ...prev,
        [day]: updatedDay
      };
    });
  };

  // Count selected hours
  const countSelectedHours = () => {
    let count = 0;
    weekdays.forEach((day) => {
      timeSlots.forEach((time) => {
        if (availability[day][time]) {
          count++;
        }
      });
    });
    return count;
  };

  // Group consecutive time slots for better visualization
  const getSelectedTimeRanges = (day) => {
    const ranges = [];
    let currentRange = null;

    timeSlots.forEach((time, index) => {
      if (availability[day][time]) {
        if (!currentRange) {
          currentRange = { start: time, end: null };
        }

        // If this is the last slot or the next slot is not selected
        if (index === timeSlots.length - 1 || !availability[day][timeSlots[index + 1]]) {
          currentRange.end = time;
          ranges.push(currentRange);
          currentRange = null;
        }
      }
    });

    return ranges.map((range) => `${range.start}-${getEndTime(range.end)}`).join(', ');
  };

  // Helper to get end time (add 1 hour to the start time)
  const getEndTime = (time) => {
    const hour = parseInt(time.split(':')[0]);
    return `${(hour + 1) % 24}:00`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-2xl font-bold text-center mb-4">Your availability schedule</h1>

      <p className="mb-6 text-center">
        Set your weekly availability to let students know when you're available for lessons.
      </p>

      {/* Timezone Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium">Your time zone</label>
          <select
            className="border rounded p-2 w-1/2"
            value={timezone}
            onChange={handleTimezoneChange}
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Europe/Paris">Paris (CET)</option>
            <option value="Asia/Tokyo">Tokyo (JST)</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">
          Your availability will be shown to students in their local time zone.
        </p>
      </div>

      {/* Weekly Schedule */}
      <div className="border rounded-lg overflow-hidden mb-8">
        {weekdays.map((day, dayIndex) => (
          <div
            key={day}
            className={`border-b ${dayIndex === weekdays.length - 1 ? 'border-b-0' : ''}`}
          >
            <div className="bg-gray-50 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium mr-2">{day}</span>
                {hasTimeSelected(day) && (
                  <span className="text-sm text-gray-600">{getSelectedTimeRanges(day)}</span>
                )}
                {!hasTimeSelected(day) && (
                  <span className="text-sm text-gray-500 italic">Not available</span>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => selectAllDay(day)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  All day
                </button>
                <button
                  onClick={() => clearDay(day)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={`${day}-${time}`}
                  className={`text-xs p-2 rounded text-center ${
                    availability[day][time]
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleTimeSlot(day, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-500 mt-0.5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-blue-800">Availability summary</p>
            <p className="text-sm text-blue-700 mt-1">
              You've selected {countSelectedHours()} hours of availability this week. We recommend
              at least 20 hours to maximize your chances of being matched with students.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex justify-between items-center">
        <button className="border border-gray-800 text-gray-800 font-medium py-2 px-5 rounded">
          Back
        </button>

        <button className="bg-pink-500 text-white font-medium py-2 px-5 rounded">
          Save and continue
        </button>
      </div>
    </div>
  );
};

export default AvailabilityUploadForm;
