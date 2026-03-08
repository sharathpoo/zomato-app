export type City = 'Mangalore' | 'Udupi' | 'Bangalore' | 'Madikeri';

export type Restaurant = {
  id: number;
  name: string;
  rating: number;
  cuisine: string[];
  distanceKm: number;
  priceRange: string;
  city: City;
  deliveryTime: string;
  image: string;
  promoted?: boolean;
  offer?: string;
};

export type RatingOption = 0 | 3.5 | 4.0 | 4.5;

export type CityOption = City | 'All';

export type CuisineOption = 'All cuisines' | string;

export type FilterState = {
  city: string;
  search: string;
  minRating: RatingOption;
  cuisines: CuisineOption[];
};
