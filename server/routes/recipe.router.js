const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});
// this is the get for breakfast recipes
router.get('/breakfast', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 AND category = 'Breakfast' ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});

// this is my get for entree items
router.get('/entree', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 AND category = 'Entree' ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});

// here is my get route for deserts
router.get('/desert', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 AND category = 'Desert' ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});

// here is my get for my snack recipes
router.get('/snack', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 AND category = 'Snack' ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});

// here is my get for my drink recipes
router.get('/drink', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM recipes 
  WHERE user_id = $1 AND category = 'Drink' ORDER BY title ASC;`
  const user = req.user.id;
  //console.log('here is the user id', user)

  pool.query(sqlText, [user])
    .then((results) => {
      res.send(results.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('error in get all server', error)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const newRecipe = req.body;
  const user = req.user.id
  const sqlText = `INSERT INTO recipes ("image", "title", "ingredients", "directions", "category", "user_id")
   VALUES ($1, $2, $3, $4, $5, $6)`

  const queryValues = [
    newRecipe.image,
    newRecipe.title,
    newRecipe.ingredients,
    newRecipe.directions,
    newRecipe.category,
    user
  ]

  pool.query(sqlText, queryValues)
  .then(() => {
    res.sendStatus(201)
  }).catch((error) => {
    console.log(`error in recipe server post, ${error}`);
    res.sendStatus(500);
  })

});

module.exports = router;
