import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { color } from '@mui/system';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div>
        <img src={user.avatar}></img>
        <h1 style={{color:'yellow'}}>Cosmic Space</h1>
        <Button variant='outlined' sx={{backgroundColor: 'darkorange', color: 'white'}}>Breakfast</Button>
        <Button variant='outlined' sx={{backgroundColor: 'red', color: 'white'}}>Entree</Button>
        <Button variant='outlined' sx={{backgroundColor: 'purple', color: 'white'}}>Desert</Button>
        <Button variant='outlined' sx={{backgroundColor: 'green', color: 'white'}}>Snack</Button>
        <Button variant='outlined' sx={{backgroundColor: 'blue', color: 'white'}}>Drink</Button>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
