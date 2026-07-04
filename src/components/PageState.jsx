export function LoadingState({ label = "Loading data" }) {
  return (
    <div className="state-panel" role="status" aria-live="polite">
      <span className="loader" aria-hidden="true" />
      <span>{label}...</span>
    </div>
  );
}

export function FallbackNotice({ source, error }) {
  if (source !== "mock") return null;

  return (
    <div className="notice" role="status">
      Backend unavailable. Showing mock data. <span>{error}</span>
    </div>
  );
}

export function EmptyState({ message }) {
  return <div className="state-panel">{message}</div>;
}
