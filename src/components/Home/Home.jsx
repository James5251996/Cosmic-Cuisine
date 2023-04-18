import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector((store) => store.recipeReducer)
  const dispatch = useDispatch();
  const [toggleView, setToggleView] = useState(true)


  useEffect(() => {
    dispatch({ type: 'GET_ALL_RECIPES' })
  }, []);

  return (
    <div className="container">
      {/* Here is where the buttons are made to create a dispatch to filter the recipes from the database */}
      <div>
        <img src={user.avatar}></img>
        <h1 style={{ color: 'yellow' }}>Cosmic Space</h1>
        <Button variant='outlined' sx={{ backgroundColor: '#fe9392', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_BREAKFAST_RECIPES' })}>Breakfast</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#6e2c99', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_ENTREE_RECIPES' })}>Entree</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#e771a2', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_DESERT_RECIPES' })}>Desert</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#aa4985', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_SNACK_RECIPES' })}>Snack</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#394baf', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_DRINK_RECIPES' })}>Drink</Button>
        <Button variant='outlined' sx={{ backgroundColor: 'lightblue', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_ALL_RECIPES' })}>Clear</Button>
      </div>
      <div className='inputsearch'>
        <input placeholder='Search' />
        {/* Here is where i will map over the recipes in my database */}
        {/* Here is a button where a user can toggle thier view between list and card view */}
        <Button variant='outlined' sx={{ width: 175, height: 40, color: 'white', borderColor: 'yellow' }} onClick={() => setToggleView(!toggleView)}>Card/List View</Button>
      </div>
      <div>

        {toggleView ? recipes.map((recipe) => {
          return (<>
            <ul>
              <li key={recipe.id} style={{ color: 'white' }}>{recipe.title}, {recipe.category}</li>
            </ul>
          </>)
        }) :
         recipes.map((recipe) => {
          return (
            <Card sx={{ maxWidth: 250 }}>
              <CardActionArea>
                <CardMedia image='https://www.livewellbakeoften.com/wp-content/uploads/2021/11/Cosmic-Brownies-8.jpg' />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {recipe.title}
                </Typography>
                <Typography>
                  {recipe.category}
                </Typography>
              </CardContent>
            </Card>
          );
          })}
      </div>
      <Button variant='outlined' sx={{ backgroundColor: '', color: 'white', width: 330 }}>Add a Recipe</Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
