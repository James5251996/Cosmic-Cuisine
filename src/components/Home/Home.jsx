import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { color } from '@mui/system';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector((store) => store.recipeReducer)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({type: 'GET_ALL_RECIPES'})
  }, []);

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
        <Button variant='outlined' sx={{backgroundColor: 'darkpink', color: 'white', width: 100}}>Clear</Button>
      </div>
      <input placeholder='Search'/>
      {/* Here is where i will map over the recipes in my database */}
      <div>
        {recipes.map(recipe => {
          return (<>
            <ul key={recipe.id}>
              <li style={{color: 'white'}}>{recipe.title}, {recipe.category}</li>
            </ul>
            </> )
        })}
      </div>
      <Button variant='outlined' sx={{backgroundColor: '', color: 'white', width: 330}}>Add a Recipe</Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
