
import React, { useState } from 'react';
import { STUDY_ROOMS, type StudyRoom } from './rooms';
import RoomFilters from './RoomFilters';
import RoomDetails from './RoomDetails';
import './App.css';

export type ActiveFilters = {
  building: string | null;
  minCapacity: number | null;
  features: string[];
};

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isTimeRangeValid = (startTime: string, endTime: string): boolean => {
  if (!startTime || !endTime) return false;
  return parseTime(startTime) < parseTime(endTime);
};

const isRoomAvailable = (
  room: StudyRoom,
  date: string,
  startTime: string,
  endTime: string,
): boolean => {
  if (!date || !startTime || !endTime) {
    return true;
  }

  if (!isTimeRangeValid(startTime, endTime)) {
    return false;
  }

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const dayOfMonth = Number(date.slice(-2));

  if (room.building === 'Library' && start < 10 * 60) {
    return false;
  }

  if (room.building === 'Engineering Hall' && start >= 14 * 60 && end <= 18 * 60) {
    return false;
  }

  if (room.building === 'Science Center' && dayOfMonth % 2 === 1) {
    return false;
  }

  if (room.building === 'Business School' && end > 17 * 60) {
    return false;
  }

  return true;
};

const applyAvailability = (
  rooms: StudyRoom[],
  date: string,
  startTime: string,
  endTime: string,
): StudyRoom[] => {
  return rooms.filter((room) => isRoomAvailable(room, date, startTime, endTime));
};

const applyFilters = (rooms: StudyRoom[], filters: ActiveFilters): StudyRoom[] => {
  return rooms.filter((room) => {
    if (filters.building && room.building !== filters.building) {
      return false;
    }

    if (filters.minCapacity !== null && room.capacity < filters.minCapacity) {
      return false;
    }

    for (const feature of filters.features) {
      if (feature === 'whiteboard' && !room.hasWhiteboard) return false;
      if (feature === 'monitor' && !room.hasMonitor) return false;
      if (feature === 'quiet' && !room.isQuiet) return false;
    }

    return true;
  });
};

const computeDisplayRooms = (
  filters: ActiveFilters,
  date: string,
  startTime: string,
  endTime: string,
): StudyRoom[] => {
  const filtered = applyFilters(STUDY_ROOMS, filters);
  return applyAvailability(filtered, date, startTime, endTime);
};

const App: React.FC = () => {
  const [filteredRooms, setFilteredRooms] = useState<StudyRoom[]>(STUDY_ROOMS);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    building: null,
    minCapacity: null,
    features: [],
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<StudyRoom | null>(null);

  const handleFilterChange = (
    nextFilteredRooms: StudyRoom[],
    nextActiveFilters: ActiveFilters,
  ) => {
    setActiveFilters(nextActiveFilters);
    setFilteredRooms(applyAvailability(nextFilteredRooms, selectedDate, startTime, endTime));
  };

  const handleDateChange = (nextDate: string) => {
    setSelectedDate(nextDate);
    setFilteredRooms(computeDisplayRooms(activeFilters, nextDate, startTime, endTime));
  };

  const handleStartTimeChange = (nextStartTime: string) => {
    setStartTime(nextStartTime);
    setFilteredRooms(computeDisplayRooms(activeFilters, selectedDate, nextStartTime, endTime));
  };

  const handleEndTimeChange = (nextEndTime: string) => {
    setEndTime(nextEndTime);
    setFilteredRooms(computeDisplayRooms(activeFilters, selectedDate, startTime, nextEndTime));
  };

  const handleClose = () => {
    setSelectedRoom(null);
  };

  const handleRequestBooking = (room: StudyRoom) => {
    const dateLabel = selectedDate || 'no date selected';
    const startLabel = startTime || 'start time';
    const endLabel = endTime || 'end time';
    alert(
      `Booking requested for ${room.building} ${room.roomNumber} on ${dateLabel} from ${startLabel} to ${endLabel}.`,
    );
    setSelectedRoom(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Campus Study Room Finder</h1>
      </header>
      <main className="main-layout">
        <aside className="filters-panel">
          <h2>Filters</h2>
          <RoomFilters allRooms={STUDY_ROOMS} onFilterChange={handleFilterChange} />
        </aside>
        <section className="room-list-section">
          <div className="availability-controls">
            <div>
              <label>
                Date:
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Start Time:
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                End Time:
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                />
              </label>
            </div>
          </div>
          <h2>Available Study Rooms</h2>
          <ul className="room-list">
            {filteredRooms.map((room) => (
              <li key={room.id} className="room-list-item">
                <button
                  type="button"
                  className="room-select-button"
                  onClick={() => setSelectedRoom(room)}
                  aria-label={`View details for ${room.building} ${room.roomNumber}`}
                >
                  <div className="room-main-info">
                    <strong>{room.building} {room.roomNumber}</strong> &mdash; Capacity: {room.capacity}
                  </div>
                  <div className="room-features">
                    Features: {room.features.slice(0, 3).join(', ') || 'None'}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      {selectedRoom && (
        <RoomDetails
          room={selectedRoom}
          onClose={handleClose}
          onRequestBooking={handleRequestBooking}
        />
      )}
    </div>
  );
};

export default App;
