import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../Global';
import { Card, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function MyGame() {

  const userId = localStorage.getItem("Auth");

  const [participant, setParticipant] = useState([]);

  const navigate = useNavigate();

  const getParticipant = () => {
    fetch(`${API}/participant`, { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        const filteredData = data.filter(item => item.participantId === userId);
        setParticipant(filteredData)
      }
      )
  }
  useEffect(() => getParticipant(), []);

  // console.log(participant);

  const deleteParticipant = (id) => {
    fetch(`${API}/participant/${id}`, { method: "DELETE" })
      .then((data) => getParticipant())
  }

  const [tournamentList, setTournamentList] = useState([]);

  const getTournament = () => {
    fetch(`${API}/tournamentlist`, { method: "GET" })
      .then((data) => data.json())
      .then((tldata) => setTournamentList(tldata))
  }
  useEffect(() => getTournament(), []);

  return (
    <div className="mygame">
      <h1>My Games</h1>
      <div className="mygames-container">
        {participant.map((TL) => (<MyGameList
          key={TL._id}
          tournament={TL}
          deleteButton={<IconButton color="error" variant='contained' className='join-btn' onClick={() => deleteParticipant(TL._id)}><DeleteIcon /></IconButton>}
          editButton={<IconButton color="primary" variant='contained' className='join-btn' onClick={() => navigate(`/edit/participant/${TL._id}`)}><EditIcon /></IconButton>}
          tournamentList={tournamentList}
        />))}
      </div>
    </div>
  );
}

function MyGameList({ tournament, tournamentList, deleteButton, editButton }) {
  const game = tournamentList.find(item => item._id === tournament.eventID);

  if (!game) {
    return <Card className="game-list">Loading...</Card>;
  }

  return (
    <Card className="game-list">
      <h1>{game.name}</h1>
      <div className="my-details">
        <h3>Name: {tournament.name}</h3>
        <h3>Age: {tournament.age}</h3>
        <h3>Email: {tournament.email}</h3>
      </div>
      <div className="action">
        {editButton}{deleteButton}
      </div>
    </Card>
  );
}
