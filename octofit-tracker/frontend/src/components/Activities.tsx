import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';
import { CapabilityCard } from './CapabilityCard.js';

type Activity = { _id?: string; type: string; minutes: number; points: number; occurredAt?: string };

export default function Activities() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getJson<{ activities: Activity[] }>('/api/activities')
      .then(({ activities: result }) => { if (active) setActivities(result); })
      .catch(() => { if (active) setError('Unable to load activities.'); });
    return () => { active = false; };
  }, []);

  return (
    <CapabilityCard title="Activities" loading={activities === null && error === null} error={error} emptyText="No activities yet." isEmpty={activities?.length === 0}>
      <ul className="list-group">
        {activities?.map((activity, index) => (
          <li className="list-group-item" key={activity._id ?? `${activity.type}-${index}`}>
            {activity.type}: {activity.minutes} minutes, {activity.points} points
          </li>
        ))}
      </ul>
    </CapabilityCard>
  );
}
