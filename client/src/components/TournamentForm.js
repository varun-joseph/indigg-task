import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const TournamentForm = ({ onSubmit }) => {
  const [tournament, setTournament] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournament((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tournament);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Tournament Name"
        value={tournament.name}
        onChange={handleChange}
      />
      <br />
      <TextField
        name="startDate"
        label="Start Date"
        value={tournament.startDate}
        onChange={handleChange}
      />
      <br />
      <TextField
        name="endDate"
        label="End Date"
        value={tournament.endDate}
        onChange={handleChange}
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default TournamentForm;
