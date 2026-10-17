import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';
import { CapabilityCard } from './CapabilityCard.js';

type Entry = { teamName: string; totalPoints: number; rank: number };

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getJson<{ leaderboard: Entry[] }>('/api/leaderboard')
      .then(({ leaderboard: result }) => { if (active) setLeaderboard(result); })
      .catch(() => { if (active) setError('Unable to load leaderboard.'); });
    return () => { active = false; };
  }, []);

  return (
    <CapabilityCard title="Leaderboard" loading={leaderboard === null && error === null} error={error} emptyText="No leaderboard scores yet." isEmpty={leaderboard?.length === 0}>
      <ol className="list-group list-group-numbered">
        {leaderboard?.map((entry) => (
          <li className="list-group-item" key={entry.rank}>
            {entry.teamName}: {entry.totalPoints} points
          </li>
        ))}
      </ol>
    </CapabilityCard>
  );
}
