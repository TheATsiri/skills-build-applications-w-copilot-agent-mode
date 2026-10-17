import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';
import { CapabilityCard } from './CapabilityCard.js';

type Workout = { _id?: string; title: string; focus?: string; minutes?: number; difficulty?: string; reason?: string };

export default function Workouts() {
  const [suggestions, setSuggestions] = useState<Workout[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getJson<{ suggestions: Workout[] }>(`/api/workouts/suggestions/${encodeURIComponent('mona@example.com')}`)
      .then(({ suggestions: result }) => { if (active) setSuggestions(result); })
      .catch(() => { if (active) setError('Unable to load workout suggestions.'); });
    return () => { active = false; };
  }, []);

  return (
    <CapabilityCard title="Workout suggestions" loading={suggestions === null && error === null} error={error} emptyText="No workout suggestions yet." isEmpty={suggestions?.length === 0}>
      <ul className="list-group">
        {suggestions?.map((workout, index) => (
          <li className="list-group-item" key={workout._id ?? `${workout.title}-${index}`}>
            <strong>{workout.title}</strong>
            {workout.focus ? ` - ${workout.focus}` : ''}
            {workout.reason ? <p className="mb-0">{workout.reason}</p> : null}
          </li>
        ))}
      </ul>
    </CapabilityCard>
  );
}
