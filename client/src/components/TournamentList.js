import React, { useEffect, useState } from 'react'
import { API } from '../Global';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TournamentList() {

  const [tournamentList, setTournamentList] = useState([]);


  const getTournament = () => {
    fetch(`${API}/tournamentlist`, { method: "GET" })
      .then((data) => data.json())
      .then((tldata) => setTournamentList(tldata))
  }
  useEffect(() => getTournament(), []);
  return (
    <div className="tournamentlist">
      <h1 style={{color:"white"}}>Total Tournaments ({tournamentList.length})</h1>
      <div className="tournamentlist-container">
        {tournamentList.map((TL) => (<Tournament
          key={TL._id}
          tournament={TL}
          id={TL._id}
        />))}
      </div>
    </div>
  );
}

function Tournament({ tournament, id }) {

  const navigate = useNavigate();

  return (
    <Card className="tournament-container">
      <h1 className='tournament-container-name'>{tournament.name}</h1>
      <div className="tournament-container-date">
        <h4>Start Date: {tournament.startdate}</h4>
        <h4>End Date: {tournament.enddate}</h4>
      </div>
      <h1 className='tournament-container-price'>Price: {tournament.price}/-</h1>
      <Button variant='contained' className='join-btn' onClick={() => navigate(`/tournamentlist/${id}`)}>Join Now +</Button>
    </Card>
  )
}