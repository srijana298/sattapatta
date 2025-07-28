import React, { useState, useEffect } from 'react';
import { Clock, Trash2, PlusCircle } from 'lucide-react';
import { MentorProfile } from '../../../services/users';
import { useUpdateAvailability } from '../../../lib/hooks';

interface AvailabilityFormProps {
  mentor: MentorProfile | undefined;
  onClose: () => void;
}

interface Availability {
  id?: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return [`${hour}:00`, `${hour}:30`];
}).flat();

const emptyAvailability: Availability = {
  day_of_week: 'Monday',
  start_time: '09:00',
  end_time: '17:00',
  is_available: true
};

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ mentor, onClose }) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateAvailabilityMutation = useUpdateAvailability();

  // Initialize form with existing data
  useEffect(() => {
    if (mentor?.availabilities && mentor.availabilities.length > 0) {
      setAvailabilities(mentor.availabilities);
    } else {
      setAvailabilities([{ ...emptyAvailability }]);
    }
  }, [mentor]);

  const handleAddAvailability = () => {
    setAvailabilities([...availabilities, { ...emptyAvailability }]);
  };

  const handleRemoveAvailability = (index: number) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities.splice(index, 1);
    setAvailabilities(newAvailabilities.length ? newAvailabilities : [{ ...emptyAvailability }]);
  };

  const handleChange = (index: number, field: keyof Availability, value: string | boolean) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[index] = {
      ...newAvailabilities[index],
      [field]: value
    };
    setAvailabilities(newAvailabilities);
  };

  const validateTimeRange = (startTime: string, endTime: string): boolean => {
    return startTime < endTime;
  };

  const validateOverlap = (availabilities: Availability[]): boolean => {
    // Group availabilities by day
    const groupedByDay: Record<string, Availability[]> = {};

    for (const slot of availabilities) {
      if (!slot.is_available) continue; // Skip inactive slots

      if (!groupedByDay[slot.day_of_week]) {
        groupedByDay[slot.day_of_week] = [];
      }

      groupedByDay[slot.day_of_week].push(slot);
    }

    // Check for overlaps within each day
    for (const day in groupedByDay) {
      const slots = groupedByDay[day];

      // Sort by start time
      slots.sort((a, b) => a.start_time.localeCompare(b.start_time));

      // Check for overlaps
      for (let i = 0; i < slots.length - 1; i++) {
        if (slots[i].end_time > slots[i + 1].start_time) {
          return false; // Overlap found
        }
      }
    }

    return true; // No overlaps
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate time ranges
      for (const slot of availabilities) {
        if (slot.is_available && !validateTimeRange(slot.start_time, slot.end_time)) {
          throw new Error('End time must be after start time');
        }
      }

      // Validate overlapping slots
      if (!validateOverlap(availabilities)) {
        throw new Error('You have overlapping time slots. Please fix them before submitting.');
      }

      await updateAvailabilityMutation.mutateAsync(availabilities);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update availability');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Weekly Availability</h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Set your weekly availability for mentoring sessions. Add multiple time slots for each day
          if needed.
        </p>

        <div className="space-y-6">
          {availabilities.map((availability, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <h4 className="text-md font-medium text-gray-700">Time Slot #{index + 1}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAvailability(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={availabilities.length === 1}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`day-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Day of Week
                  </label>
                  <select
                    id={`day-${index}`}
                    value={availability.day_of_week}
                    onChange={(e) => handleChange(index, 'day_of_week', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`is_available-${index}`}
                    checked={availability.is_available}
                    onChange={(e) => handleChange(index, 'is_available', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`is_available-${index}`} className="ml-2 text-sm text-gray-700">
                    Available
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`start_time-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Time
                  </label>
                  <select
                    id={`start_time-${index}`}
                    value={availability.start_time}
                    onChange={(e) => handleChange(index, 'start_time', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {TIME_SLOTS.map((time) => (
                      <option key={`start-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`end_time-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Time
                  </label>
                  <select
                    id={`end_time-${index}`}
                    value={availability.end_time}
                    onChange={(e) => handleChange(index, 'end_time', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {TIME_SLOTS.map((time) => (
                      <option key={`end-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddAvailability}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Another Time Slot
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
