import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Link, useHistory } from "react-router-dom";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const recipes = useSelector((store) => store.recipeReducer)
  const dispatch = useDispatch();
  const [toggleView, setToggleView] = useState(false)
  const history = useHistory();


  useEffect(() => {
    dispatch({ type: 'GET_ALL_RECIPES' })
  }, []);

  function viewDetails (recipeID) {
    console.log('view details was clicked')
    console.log('this is my recipe id:', recipeID)

    dispatch({
      type: "GET_RECIPE_DETAILS",
      payload: recipeID
    })
    history.push('/recipes/:id')
  }

  return (
    <div className="container">
      {/* Here is where the buttons are made to create a dispatch to filter the recipes from the database */}
      <div>
        
        <Button variant='outlined' sx={{ backgroundColor: '#fe9392', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_BREAKFAST_RECIPES' })}>Breakfast</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#6e2c99', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_ENTREE_RECIPES' })}>Entree</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#e771a2', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_DESERT_RECIPES' })}>Desert</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#aa4985', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_SNACK_RECIPES' })}>Snack</Button>
        <Button variant='outlined' sx={{ backgroundColor: '#394baf', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_DRINK_RECIPES' })}>Drink</Button>
        <Button variant='outlined' sx={{ backgroundColor: 'lightblue', color: 'white', width: 100 }} onClick={() => dispatch({ type: 'GET_ALL_RECIPES' })}>All</Button>
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
              <li key={recipe.id} style={{ color: 'white', padding: 10 }} onClick={() => viewDetails(recipe.id)}>{recipe.title}, {recipe.category}</li>
          </>)
        }) :
          recipes.map((recipe) => {
            return (
              <Card sx={{ maxWidth: 300, marginLeft: 'auto', marginRight: 'auto', marginBottom: 3, marginTop: 3}} key={recipe.id}>
              <CardActionArea onClick={() => viewDetails(recipe.id)}>
                  <CardMedia component='img' sx={{height: 150, justifyContent: 'center'}}
                  image={recipe.image} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {recipe.title} 
                  </Typography>
                  <Typography>
                    {recipe.category}
                  </Typography>
                </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
      <Link to='/addrecipe'>
        <Button variant='outlined' sx={{ backgroundColor: '', color: 'white', width: 330, marginTop: 5 }}>Add a Recipe</Button>
      </Link>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
