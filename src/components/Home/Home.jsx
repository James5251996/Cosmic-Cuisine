import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { color } from '@mui/system';
import { useEffect } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      {/* Here is where the buttons are made to create a dispatch to filter the recipes from the database */}
      <div>
        <img src={user.avatar}></img>
        <h1 style={{color:'yellow'}}>Cosmic Space</h1>
        <Button variant='outlined' sx={{backgroundColor: 'darkorange', color: 'white', width: 100}}>Breakfast</Button>
        <Button variant='outlined' sx={{backgroundColor: 'red', color: 'white', width: 100}}>Entree</Button>
        <Button variant='outlined' sx={{backgroundColor: 'purple', color: 'white', width: 100}}>Desert</Button>
        <Button variant='outlined' sx={{backgroundColor: 'green', color: 'white', width: 100}}>Snack</Button>
        <Button variant='outlined' sx={{backgroundColor: 'blue', color: 'white', width: 100}}>Drink</Button>
        <Button variant='outlined' sx={{backgroundColor: '', color: 'white', width: 100}}>Clear</Button>
      </div>
      {/* Here is where i will map over the recipes in my database */}
      <div></div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
