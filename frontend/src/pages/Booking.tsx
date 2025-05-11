import { useState } from 'react';
import { Clock, Calendar, Code, X } from 'lucide-react';

interface;

export default function BookingModal({ isOpen, onClose, tutorId, tutorName }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [focusArea, setFocusArea] = useState('');
  const [notes, setNotes] = useState('');

  // Mock available time slots - in a real app, fetch these from backend
  const availableSlots = [
    { id: 1, date: '2025-05-15', time: '09:00', available: true },
    { id: 2, date: '2025-05-15', time: '10:00', available: true },
    { id: 3, date: '2025-05-15', time: '14:00', available: true },
    { id: 4, date: '2025-05-16', time: '11:00', available: true },
    { id: 5, date: '2025-05-16', time: '15:00', available: true },
    { id: 6, date: '2025-05-17', time: '13:00', available: true }
  ];

  // Tech focus areas
  const focusAreas = [
    'JavaScript Fundamentals',
    'React & Hooks',
    'Node.js & Express',
    'TypeScript',
    'Frontend Architecture',
    'Backend Development'
  ];

  const handleBookSession = async () => {
    try {
      // In a real implementation, this would be an API call
      const response = await bookTrialSession({
        tutorId,
        date: selectedDate,
        time: selectedTime,
        focusArea,
        notes,
        isTrialSession: true
      });

      // Move to confirmation step
      setStep(3);

      // You would typically update the session count here
      // Either by refreshing data or optimistically updating the UI
    } catch (error) {
      console.error('Booking failed:', error);
      // Show error message
    }
  };

  // Mock function - would be replaced by actual API call
  const bookTrialSession = async (sessionData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, sessionId: 'sess_' + Math.random().toString(36).substr(2, 9) });
      }, 800);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">
            {step === 1 && 'Book Trial Session'}
            {step === 2 && 'Session Details'}
            {step === 3 && 'Booking Confirmed!'}
          </h2>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Select a date and time for your 50-minute trial session with {tutorName}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Available dates</label>
              <div className="grid grid-cols-3 gap-2">
                {[...new Set(availableSlots.map((slot) => slot.date))].map((date) => (
                  <button
                    key={date}
                    className={`p-2 border rounded-md text-sm ${
                      selectedDate === date ? 'bg-blue-50 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Available times</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots
                    .filter((slot) => slot.date === selectedDate)
                    .map((slot) => (
                      <button
                        key={slot.id}
                        className={`p-2 border rounded-md text-sm flex items-center justify-center gap-1 ${
                          selectedTime === slot.time ? 'bg-blue-50 border-blue-500' : ''
                        }`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        <Clock size={14} />
                        {slot.time}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium mt-4"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Session Details */}
        {step === 2 && (
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                What would you like to focus on?
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
              >
                <option value="">Select a focus area</option>
                {focusAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Any specific topics or questions?
              </label>
              <textarea
                className="w-full p-2 border rounded-md h-24"
                placeholder="e.g., I need help with React Hooks and state management"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Session Summary</h3>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-gray-500" />
                <span>
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-gray-500" />
                <span>{selectedTime} - 50 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Code size={16} className="text-gray-500" />
                <span>{focusArea || 'General programming guidance'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-black py-3 px-4 rounded-md font-medium"
                onClick={handleBookSession}
              >
                Book Trial Session
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="p-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Your trial session is booked!</h3>
            <p className="text-gray-600 mb-4">
              We've sent the details to your email. {tutorName} will contact you shortly to confirm.
            </p>

            <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-gray-500" />
                <span>
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span>{selectedTime} - 50 minutes</span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
