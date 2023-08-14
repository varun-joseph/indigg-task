import React, { useEffect, useState } from 'react'
import { API } from '../Global';
import { Button, Card, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function MyTournaments() {

  const userId = localStorage.getItem("Auth");

  const [tournamentList, setTournamentList] = useState([]);
  const [participant, setParticipant] = useState([]);

  const navigate = useNavigate();

  const getTournament = () => {
    fetch(`${API}/tournamentlist`, { method: "GET" })
      .then((data) => data.json())
      .then((tldata) => setTournamentList(tldata))
  }
  useEffect(() => getTournament(), []);

  const deleteTournament = (id) => {
    fetch(`${API}/tournamentlist/${id}`, { method: "DELETE" })
      .then((data) => getTournament())
  }

  //geting the participants by tournament objectid

  const getParticipant = () => {
    fetch(`${API}/participant`, { method: "GET" })
      .then((data) => data.json())
      .then((tldata) => setParticipant(tldata))
  }
  useEffect(() => getParticipant(), []);

  const deleteParticipant = (id) => {
    fetch(`${API}/participant/${id}`, { method: "DELETE" })
      .then((data) => getParticipant())
  }

  return (
    <div className="tournamentlist">
      <div className="tournamentlist-container">
        {tournamentList.filter(p => p.userId === userId).map((TL) => (<Tournament
          key={TL._id}
          tournament={TL}
          id={TL._id}
          deleteButton={<IconButton color="error" variant='contained' className='join-btn' onClick={() => deleteTournament(TL._id)}><DeleteIcon /></IconButton>}
          editButton={<IconButton color="primary" variant='contained' className='join-btn' onClick={() => navigate(`/edit/tournamentlist/${TL._id}`)}><EditIcon /></IconButton>}
          participant={participant}
          deleteParticipant={deleteParticipant}
        />))}
      </div>
    </div>
  );
}

function Tournament({ tournament, deleteButton, editButton, participant, deleteParticipant }) {

  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  }
  const filterdData = participant.filter(p => p.eventID === tournament._id)
  // console.log(filterdData);
  return (
    <div className="mytournament">
      <h1 style={{ color: "white" }}>My Tournaments</h1>

      <Card className="tournament-container">
        <h1 className='tournament-container-name'>{tournament.name}</h1>
        <div className="tournament-container-date">
          <h4>Start Date: {tournament.startdate}</h4>
          <h4>End Date: {tournament.enddate}</h4>
        </div>
        <h1 className='tournament-container-price'>Price: {tournament.price}/-</h1>
        <div className="tournament-footer">
          <Button variant='contained' className='join-btn' onClick={toggleContent}>{showContent ? 'Hide Participants' : 'Show Participants'}</Button>
          <div className="actions">
            {editButton}{deleteButton}
          </div>
        </div>
        {showContent &&
          <table className='table-list' style={{ border: '1px solid black', width: '100%', marginTop: '30px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filterdData.map((participant) => (
                <tr key={participant.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{participant.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{participant.age}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{participant.email}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}><IconButton
                    color="error" variant='contained' className='join-btn' onClick={() => deleteParticipant(participant._id)}><DeleteIcon /></IconButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </Card>
    </div>
  )
}