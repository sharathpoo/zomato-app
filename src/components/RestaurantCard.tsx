import type { Restaurant } from '../types/restaurant';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <article className="restaurant-card">
      <div className="card-image-wrap">
        <img className="card-image" src={restaurant.image} alt={restaurant.name} loading="lazy" />
        {restaurant.promoted && <span className="tag-promoted">PROMOTED</span>}
        {restaurant.offer && <span className="tag-offer">{restaurant.offer}</span>}
        <span className="tag-time">{restaurant.deliveryTime}</span>
      </div>
      <div className="card-content">
        <div className="card-header-row">
          <h3>{restaurant.name}</h3>
          <span className="rating-pill">{restaurant.rating.toFixed(1)} * </span>
        </div>
        <p className="muted-line">{restaurant.cuisine.join(', ')}</p>
        <div className="card-footer-row">
          <span className="muted-line">
            {restaurant.city} - {restaurant.distanceKm.toFixed(1)} km
          </span>
          <span className="price-text">{restaurant.priceRange}</span>
        </div>
      </div>
    </article>
  );
}
