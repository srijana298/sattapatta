import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { MentorProfile } from '../../services/users';
import './calendar-styles.css';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  isAvailable: boolean;
}

interface AvailabilityCalendarProps {
  mentor: MentorProfile | undefined;
}

const dayMapping: { [key: string]: number } = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0
};

const parseTime = (timeString: string): { hours: number; minutes: number } => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ mentor }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!mentor?.availabilities) return;

    // Get the current week's Monday
    const currentWeek = startOfWeek(date, { weekStartsOn: 1 });

    // Create events from availability slots
    const calendarEvents: CalendarEvent[] = mentor.availabilities
      .filter((slot) => slot.is_available) // Only show available slots
      .map((slot) => {
        // Get the day number (0 = Sunday, 1 = Monday, etc.)
        const dayNumber = dayMapping[slot.day_of_week];

        // Parse start and end times
        const startTime = parseTime(slot.start_time);
        const endTime = parseTime(slot.end_time);

        // Create a date for this day in the current week
        const dayDate = new Date(currentWeek);
        dayDate.setDate(dayDate.getDate() + ((dayNumber - 1 + 7) % 7));

        // Create start and end dates
        const startDate = new Date(dayDate);
        startDate.setHours(startTime.hours, startTime.minutes, 0);

        const endDate = new Date(dayDate);
        endDate.setHours(endTime.hours, endTime.minutes, 0);

        return {
          id: slot.id || 0,
          title: `Available: ${slot.start_time} - ${slot.end_time}`,
          start: startDate,
          end: endDate,
          isAvailable: slot.is_available
        };
      });

    setEvents(calendarEvents);
  }, [mentor, date]);

  // Use window width to determine default view
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial view based on current width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.isAvailable ? '#2563eb' : '#ccc',
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0',
        display: 'block',
        fontSize: '0.85em',
        padding: '4px 8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Availability Calendar</h3>
        <div className="text-sm text-gray-500">Showing weekly schedule</div>
      </div>
      <div className="p-3 md:p-6">
        <div className="mb-4 text-sm text-gray-500">
          This calendar shows your weekly availability for mentoring sessions. Blue blocks represent
          available time slots.
        </div>
        <div style={{ height: windowWidth < 768 ? 500 : 600 }} className="availability-calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            date={date}
            onNavigate={setDate}
            defaultView={windowWidth < 768 ? 'day' : 'week'}
            views={['week', 'day']}
            step={30}
            timeslots={2}
            eventPropGetter={eventStyleGetter}
            dayLayoutAlgorithm="no-overlap"
            min={new Date(new Date().setHours(6, 0, 0, 0))} // Start at 6 AM
            max={new Date(new Date().setHours(23, 0, 0, 0))} // End at 11 PM
            formats={{
              timeGutterFormat: (date) => moment(date).format('h A'),
              dayFormat: (date) => moment(date).format('dddd')
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
