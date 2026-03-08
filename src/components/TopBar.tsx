import { useEffect, useRef, useState } from 'react';
import type { CityOption } from '../types/restaurant';

type TopBarProps = {
  city: CityOption;
  cityOptions: readonly CityOption[];
  search: string;
  onCityChange: (city: CityOption) => void;
  onSearchChange: (value: string) => void;
};

function LocationIcon() {
  return (
    <svg className="inline-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12A7 7 0 0 0 5 10c0 5.8 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="inline-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10 4a6 6 0 1 0 3.8 10.6l4.3 4.3 1.4-1.4-4.3-4.3A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopBar({ city, cityOptions, search, onCityChange, onSearchChange }: TopBarProps) {
  const [isLocationOpen, setLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!locationRef.current?.contains(event.target as Node)) {
        setLocationOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="top-bar">
      <div className="brand-row">
        <span className="brand-logo">zomato</span>
        <div className="location-dropdown" ref={locationRef}>
          <button
            type="button"
            className="location-select-wrap"
            onClick={() => setLocationOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isLocationOpen}
          >
            <LocationIcon />
            <span>{city === 'All' ? 'All locations' : city}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {isLocationOpen && (
            <ul className="location-menu" role="listbox">
              {cityOptions.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`location-item ${city === item ? 'active' : ''}`}
                    onClick={() => {
                      onCityChange(item);
                      setLocationOpen(false);
                    }}
                  >
                    {item === 'All' ? 'All locations' : item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="search-wrap">
        <SearchIcon />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search for restaurant, cuisine or dish"
        />
      </div>
    </header>
  );
}
