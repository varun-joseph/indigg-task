import { Button } from '@mui/material';
import React from 'react';
import logo from '../image/image-2.png'
import { useNavigate } from 'react-router-dom';

export function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container" >
        <h1>Wecome to Eassy Tournaments</h1> <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, inventore eum dolorum reiciendis dicta ad repellat? Earum vero aliquid dolores eos doloribus? Quisquam libero ratione itaque? Quis sint alias accusamus commodi exercitationem repellendus, maxime voluptatem dolores fugiat eaque, eligendi esse? Quam dignissimos incidunt minus placeat nisi alias unde atque aliquam?</p> <br />
        <div className="home-btn">
        <Button variant='contained' onClick={() => navigate(`/tournamentlist`)}>Join</Button>
        <Button variant='contained' onClick={() => navigate(`/create/tournament`)}>Create</Button>
        </div>
      </div>
      <div className="svg">
        <img src= {logo} alt="" />
      </div>
    </div>
  );
}
