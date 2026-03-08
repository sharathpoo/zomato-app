import type { CuisineOption, RatingOption } from '../types/restaurant';

type FilterBarProps = {
  minRating: RatingOption;
  ratingOptions: readonly RatingOption[];
  selectedCuisines: CuisineOption[];
  cuisineOptions: string[];
  activeFilters: number;
  onRatingChange: (value: RatingOption) => void;
  onCuisineToggle: (value: CuisineOption) => void;
  onReset: () => void;
};

export function FilterBar({
  minRating,
  ratingOptions,
  selectedCuisines,
  cuisineOptions,
  activeFilters,
  onRatingChange,
  onCuisineToggle,
  onReset,
}: FilterBarProps) {
  return (
    <section className="filters-wrap">
      <button type="button" className="chip chip-neutral" onClick={onReset}>
        Filters {activeFilters > 0 && <span className="count-badge">{activeFilters}</span>}
      </button>

      {ratingOptions.map((value) => (
        <button
          type="button"
          key={value}
          className={`chip ${minRating === value ? 'chip-active' : ''}`}
          onClick={() => onRatingChange(value)}
        >
          {value === 0 ? 'Any rating' : `Rating ${value.toFixed(1)}+`}
        </button>
      ))}

      {cuisineOptions.map((cuisine) => {
        const active = selectedCuisines.includes(cuisine);

        return (
          <button
            type="button"
            key={cuisine}
            className={`chip ${active ? 'chip-active' : ''}`}
            onClick={() => onCuisineToggle(cuisine)}
          >
            {cuisine}
          </button>
        );
      })}
    </section>
  );
}