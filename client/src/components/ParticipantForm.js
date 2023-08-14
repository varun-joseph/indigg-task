import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const ParticipantForm = ({ onSubmit }) => {
  const [participant, setParticipant] = useState({
    name: '',
    age: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(participant);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Participant Name"
        value={participant.name}
        onChange={handleChange}
      />
      <br />
      <TextField
        name="age"
        label="Age"
        value={participant.age}
        onChange={handleChange}
      />
      <br />
      <TextField
        name="email"
        label="Email"
        value={participant.email}
        onChange={handleChange}
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default ParticipantForm;
