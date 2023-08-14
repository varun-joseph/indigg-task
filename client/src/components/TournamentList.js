import React, { useEffect, useState } from 'react';
import { apiClient } from '../api';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await apiClient.get('/tournaments');
      setTournaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Tournaments</h2>
      {tournaments.map((tournament) => (
        <div key={tournament._id}>
          <h3>{tournament.name}</h3>
          <p>Start Date: {tournament.startDate}</p>
          <p>End Date: {tournament.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TournamentList;
