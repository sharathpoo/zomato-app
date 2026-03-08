import { useMemo, useState } from 'react';
import './App.css';
import { EmptyState } from './components/EmptyState';
import { FilterBar } from './components/FilterBar';
import { HeroBanner } from './components/HeroBanner';
import { RestaurantCard } from './components/RestaurantCard';
import { TopBar } from './components/TopBar';
import { restaurants } from './data/restaurants';
import type { FilterState, CuisineOption, CityOption } from './types/restaurant';
import {
  CITY_OPTIONS,
  DEFAULT_FILTERS,
  RATING_OPTIONS,
  countActiveFilters,
  filterRestaurants,
  getCuisineOptions,
} from './utils/restaurantFilters';

function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const cuisineOptions = useMemo(() => getCuisineOptions(restaurants), []);

  const filteredRestaurants = useMemo(
    () => filterRestaurants(restaurants, filters),
    [filters],
  );

  const activeFilters = countActiveFilters(filters);

  const updateFilters = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const toggleCuisine = (value: CuisineOption) => {
    setFilters((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(value)
        ? prev.cuisines.filter((c) => c !== value)
        : [...prev.cuisines, value],
    }));
  };

  return (
    <div className="app-shell">
      <TopBar
        city={filters.city as CityOption}
        cityOptions={CITY_OPTIONS}
        search={filters.search}
        onCityChange={(city) => updateFilters({ city })}
        onSearchChange={(search) => updateFilters({ search })}
      />

      <HeroBanner />

      <FilterBar
        minRating={filters.minRating}
        ratingOptions={RATING_OPTIONS}
        selectedCuisines={filters.cuisines}
        cuisineOptions={cuisineOptions}
        activeFilters={activeFilters}
        onRatingChange={(minRating) => updateFilters({ minRating })}
        onCuisineToggle={toggleCuisine}
        onReset={resetFilters}
      />

      <main className="list-section">
        <h2>{filteredRestaurants.length} restaurants around you</h2>

        {filteredRestaurants.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;