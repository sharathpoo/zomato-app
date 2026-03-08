type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>No restaurants match your filters</h3>
      <p>Try clearing one or more filters to see available restaurants.</p>
      <button type="button" onClick={onReset}>
        Clear all filters
      </button>
    </div>
  );
}
