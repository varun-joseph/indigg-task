import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const ParticipantList = ({ participants }) => {
  return (
    <List>
      {participants.map((participant) => (
        <ListItem key={participant.id}>
          <ListItemText primary={participant.name} secondary={`Age: ${participant.age}, Email: ${participant.email}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ParticipantList;
