import React, { useEffect, useState } from 'react';
import { CreateParticipant } from './components/ParticipantForm';
import { CreateTournament } from './components/TournamentForm';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';
import TournamentList from './components/TournamentList';
import Login from './components/Login';
import SignUp from './components/Signup';
import { MyTournaments } from './components/MyTournaments';
import { EditTournament } from './components/EditTournament';
import { MyGame } from './components/MyGame';
import { EditParticipant } from './components/EditParticipant';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

function App() {

  const navigate = useNavigate()

  const [hide, setHide] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHide(token);
  }, [])


  const Logout = () => {
    localStorage.clear();
    // window.location.reload();
    setHide(false)
  }

  return (
    <div className="App">
      <AppBar position='fixed' sx={{ backgroundColor: "black" }}>
        <Toolbar className='toolbar'>
          <IconButton><SportsKabaddiIcon sx={{ color: "Yellow" }} /></IconButton>
          <div className="nav-menu">
            <Button className='menu' color='inherit' onClick={() => navigate(`/`)}>Home</Button>
            <Button className='menu' color='inherit' onClick={() => navigate(`/tournamentlist`)}>Tournaments</Button>
            <Button className='menu' color='inherit' onClick={() => navigate(`/mytournaments`)}>My Tournaments</Button>
            <Button className='menu' color='inherit' onClick={() => navigate(`/mygames`)}>My Games</Button>
            {hide ? (<Button className='menu' color='inherit' onClick={Logout}>Logout</Button>) : null}
          </div>
        </Toolbar>
      </AppBar>

      {/* Route Setup */}
      <Routes>
        <Route path='/' element={<ProductedRoute><Home /></ProductedRoute>} />
        <Route path='/tournamentlist/:id' element={<ProductedRoute><CreateParticipant /></ProductedRoute>} />
        <Route path='/create/tournament' element={<ProductedRoute><CreateTournament /></ProductedRoute>} />
        <Route path='/tournamentlist' element={<ProductedRoute><TournamentList /></ProductedRoute>} />
        <Route path='/edit/tournamentlist/:id' element={<ProductedRoute><EditTournament /></ProductedRoute>} />
        <Route path='/edit/participant/:id' element={<ProductedRoute><EditParticipant /></ProductedRoute>} />
        <Route path='/mytournaments' element={<ProductedRoute><MyTournaments /></ProductedRoute>} />
        <Route path='/mygames' element={<ProductedRoute><MyGame /></ProductedRoute>} />
        <Route path='/users/login' element={<Login />} />
        <Route path='/users/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

function ProductedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  // console.log(isAuth);
  return isAuth ? children : <Navigate replace to={"/users/login"} />;
}


export default App;
