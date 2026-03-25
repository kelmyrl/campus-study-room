
import { STUDY_ROOMS } from './rooms';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Campus Study Room Finder</h1>
      </header>
      <main className="main-layout">
        <aside className="filters-panel">
          {/* Filters will go here in the future */}
          <div className="filters-placeholder">
            <h2>Filters</h2>
            <p>(Coming soon)</p>
          </div>
        </aside>
        <section className="room-list-section">
          <h2>Available Study Rooms</h2>
          <ul className="room-list">
            {STUDY_ROOMS.map((room) => (
              <li key={room.id} className="room-list-item">
                <div className="room-main-info">
                  <strong>{room.building} {room.roomNumber}</strong> &mdash; Capacity: {room.capacity}
                </div>
                <div className="room-features">
                  Features: {room.features.slice(0, 3).join(', ') || 'None'}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      {/* Inline styles for basic responsive layout */}
      <style>{`
        .app-container {
          font-family: Arial, sans-serif;
          background: #f8f9fa;
          min-height: 100vh;
        }
        .app-header {
          background: #2d3e50;
          color: #fff;
          padding: 1.5rem 1rem 1rem 1rem;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .main-layout {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          max-width: 1100px;
          margin: 2rem auto;
          gap: 2rem;
          padding: 0 1rem;
        }
        .filters-panel {
          flex: 0 0 260px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          padding: 1.5rem 1rem;
          min-height: 300px;
        }
        .filters-placeholder {
          color: #888;
        }
        .room-list-section {
          flex: 1 1 0%;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          padding: 1.5rem 1rem;
        }
        .room-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .room-list-item {
          border-bottom: 1px solid #eee;
          padding: 0.75rem 0;
        }
        .room-list-item:last-child {
          border-bottom: none;
        }
        .room-main-info {
          font-size: 1.1rem;
        }
        .room-features {
          color: #555;
          font-size: 0.97rem;
        }
        @media (max-width: 700px) {
          .main-layout {
            flex-direction: column;
            gap: 1.2rem;
          }
          .filters-panel, .room-list-section {
            min-width: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
