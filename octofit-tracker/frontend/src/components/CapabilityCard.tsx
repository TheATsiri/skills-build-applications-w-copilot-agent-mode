import type { ReactNode } from 'react';

type Props = {
  title: string;
  loading: boolean;
  error: string | null;
  emptyText: string;
  isEmpty: boolean;
  children: ReactNode;
};

export function CapabilityCard({ title, loading, error, emptyText, isEmpty, children }: Props) {
  return (
    <section className="card h-100">
      <div className="card-body">
        <h2 className="h4">{title}</h2>
        {loading ? <p role="status">Loading {title.toLowerCase()}...</p> : null}
        {!loading && error ? <p role="alert">{error}</p> : null}
        {!loading && !error && isEmpty ? <p>{emptyText}</p> : null}
        {!loading && !error && !isEmpty ? children : null}
      </div>
    </section>
  );
}
