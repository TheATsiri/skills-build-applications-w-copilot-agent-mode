import { useEffect, useState } from 'react';
import { getJson } from '../api/client.js';
import { CapabilityCard } from './CapabilityCard.js';

type Team = { _id?: string; name: string; mascot?: string; members: string[] };

export default function Teams() {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getJson<{ teams: Team[] }>('/api/teams')
      .then(({ teams: result }) => { if (active) setTeams(result); })
      .catch(() => { if (active) setError('Unable to load teams.'); });
    return () => { active = false; };
  }, []);

  return (
    <CapabilityCard title="Teams" loading={teams === null && error === null} error={error} emptyText="No teams yet." isEmpty={teams?.length === 0}>
      <ul className="list-group">
        {teams?.map((team, index) => (
          <li className="list-group-item" key={team._id ?? `${team.name}-${index}`}>
            <strong>{team.name}</strong>{team.mascot ? ` - ${team.mascot}` : ''}
            <p className="mb-0">Members: {team.members.join(', ') || 'None'}</p>
          </li>
        ))}
      </ul>
    </CapabilityCard>
  );
}
