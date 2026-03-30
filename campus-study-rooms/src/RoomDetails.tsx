import React from 'react';
import type { StudyRoom } from './rooms';

interface RoomDetailsProps {
  room: StudyRoom | null;
  onClose: () => void;
  onRequestBooking: (room: StudyRoom) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onClose, onRequestBooking }) => {
  if (!room) {
    return null;
  }

  return (
    <div style={overlayStyles} role="dialog" aria-modal="true" aria-labelledby="room-details-title">
      <div style={cardStyles}>
        <header style={headerStyles}>
          <h2 id="room-details-title">{room.building} {room.roomNumber}</h2>
          <button type="button" onClick={onClose} style={closeButtonStyles} aria-label="Close room details">
            Close
          </button>
        </header>

        <div style={contentStyles}>
          <p><strong>Capacity:</strong> {room.capacity}</p>
          <p><strong>Floor:</strong> {room.floor}</p>
          <div>
            <strong>Features:</strong>
            {room.features.length > 0 ? (
              <ul style={listStyles}>
                {room.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : (
              <span> None</span>
            )}
          </div>
          <p><strong>Quiet:</strong> {room.isQuiet ? 'Yes' : 'No'}</p>
          <p><strong>Whiteboard:</strong> {room.hasWhiteboard ? 'Yes' : 'No'}</p>
          <p><strong>Monitor:</strong> {room.hasMonitor ? 'Yes' : 'No'}</p>
        </div>

        <footer style={footerStyles}>
          <button type="button" onClick={() => onRequestBooking(room)} style={primaryButtonStyles}>
            Request booking
          </button>
          <button type="button" onClick={onClose} style={secondaryButtonStyles}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  zIndex: 1000,
};

const cardStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: '520px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const headerStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1rem',
};

const closeButtonStyles: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#333',
  cursor: 'pointer',
  fontWeight: 600,
};

const contentStyles: React.CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
  color: '#333',
};

const footerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const primaryButtonStyles: React.CSSProperties = {
  padding: '0.8rem 1rem',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#2d3e50',
  color: '#fff',
  cursor: 'pointer',
};

const secondaryButtonStyles: React.CSSProperties = {
  padding: '0.8rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#fff',
  color: '#333',
  cursor: 'pointer',
};

const listStyles: React.CSSProperties = {
  listStyle: 'disc',
  margin: '0.5rem 0 0 1.25rem',
  padding: 0,
};

export default RoomDetails;
