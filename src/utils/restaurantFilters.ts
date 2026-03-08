import type { FilterState, Restaurant } from '../types/restaurant';

export const RATING_OPTIONS = [0, 3.5, 4.0, 4.5] as const;

export const CITY_OPTIONS = [
  'All',
  'Mangalore',
  'Udupi',
  'Bangalore',
  'Madikeri',
] as const;

export const DEFAULT_FILTERS: FilterState = {
  city: 'All',
  search: '',
  minRating: 0,
  cuisines: [],
};

export function getCuisineOptions(items: Restaurant[]): string[] {
  return Array.from(new Set(items.flatMap((restaurant) => restaurant.cuisine))).sort();
}

export function filterRestaurants(items: Restaurant[], filters: FilterState): Restaurant[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return items.filter((restaurant) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      restaurant.name.toLowerCase().includes(normalizedSearch) ||
      restaurant.cuisine.some((item) => item.toLowerCase().includes(normalizedSearch));

    const matchesRating = restaurant.rating >= filters.minRating;
    const matchesCity = filters.city === 'All' || restaurant.city === filters.city;

    const matchesCuisine =
      filters.cuisines.length === 0 ||
      restaurant.cuisine.some((c) => filters.cuisines.includes(c));

    return matchesSearch && matchesRating && matchesCity && matchesCuisine;
  });
}

export function countActiveFilters(filters: FilterState): number {
  return (
    Number(filters.search.trim().length > 0) +
    Number(filters.minRating > 0) +
    Number(filters.city !== 'All') +
    filters.cuisines.length
  );
}