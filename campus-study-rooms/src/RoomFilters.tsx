import React, { useState } from 'react';
import type { StudyRoom } from './rooms';

export type ActiveFilters = {
  building: string | null;
  minCapacity: number | null;
  features: string[];
};

interface RoomFiltersProps {
  allRooms: StudyRoom[];
  onFilterChange: (filteredRooms: StudyRoom[], activeFilters: ActiveFilters) => void;
}

const FEATURE_OPTIONS = [
  { label: 'Whiteboard', value: 'whiteboard' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Quiet', value: 'quiet' },
];

const RoomFilters: React.FC<RoomFiltersProps> = ({ allRooms, onFilterChange }) => {
  const [filters, setFilters] = useState<ActiveFilters>({
    building: null,
    minCapacity: null,
    features: [],
  });

  // Get unique building names from allRooms
  const buildingOptions = Array.from(new Set(allRooms.map(r => r.building)));

  // Handle filter changes
  const handleChange = (field: keyof ActiveFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    const filtered = filterRooms(allRooms, newFilters);
    onFilterChange(filtered, newFilters);
  };

  // Handle feature checkbox change
  const handleFeatureChange = (feature: string, checked: boolean) => {
    let newFeatures = filters.features.slice();
    if (checked) {
      if (!newFeatures.includes(feature)) newFeatures.push(feature);
    } else {
      newFeatures = newFeatures.filter(f => f !== feature);
    }
    handleChange('features', newFeatures);
  };

  // Filtering logic
  function filterRooms(rooms: StudyRoom[], f: ActiveFilters): StudyRoom[] {
    return rooms.filter(room => {
      if (f.building && room.building !== f.building) return false;
      if (f.minCapacity !== null && room.capacity < f.minCapacity) return false;
      for (const feature of f.features) {
        if (feature === 'whiteboard' && !room.hasWhiteboard) return false;
        if (feature === 'monitor' && !room.hasMonitor) return false;
        if (feature === 'quiet' && !room.isQuiet) return false;
      }
      return true;
    });
  }

  return (
    <form className="room-filters" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        Building:
        <select
          value={filters.building ?? ''}
          onChange={e => handleChange('building', e.target.value || null)}
        >
          <option value="">All</option>
          {buildingOptions.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </label>
      <label>
        Minimum Capacity:
        <input
          type="number"
          min={1}
          value={filters.minCapacity ?? ''}
          onChange={e => handleChange('minCapacity', e.target.value ? Number(e.target.value) : null)}
          placeholder="Any"
        />
      </label>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend>Features:</legend>
        {FEATURE_OPTIONS.map(opt => (
          <label key={opt.value} style={{ display: 'block', marginBottom: 4 }}>
            <input
              type="checkbox"
              checked={filters.features.includes(opt.value)}
              onChange={e => handleFeatureChange(opt.value, e.target.checked)}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>
    </form>
  );
};

export default RoomFilters;
