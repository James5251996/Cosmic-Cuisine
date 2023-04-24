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
  WHERE user_id = $1 AND category = 'Dessert' ORDER BY title ASC;`
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
  console.log('my query values', queryValues)

  pool.query(sqlText, queryValues)
  .then(() => {
    res.sendStatus(201)
  }).catch((error) => {
    console.log(`error in recipe server post, ${error}`);
    res.sendStatus(500);
  })

});

// here is my get for a specific recipe to view that recipes data
router.get('/:id', (req, res) => {
  const sqlText = `SELECT * FROM recipes
  WHERE id = $1`

  pool.query(sqlText, [req.params.id])
  .then((results) => {
    res.send(results.rows)
  }).catch((error) => {
    console.log('error in get details server request', error)
    res.sendStatus(500)
  })

})


// here is my put request to update the recipe on the database
router.put('/:id', (req, res) => {
  const recipeID = req.params.id
  const updateRecipe = [
    req.body.title,
    req.body.image,
    req.body.category,
    req.body.ingredients,
    req.body.directions,
    recipeID
  ]
  const sqlText = `UPDATE recipes SET title = $1, image = $2, category = $3, ingredients = $4, directions = $5
  WHERE id = $6`
  pool.query(sqlText, updateRecipe)
  .then(results => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in my recipe router put:', error)
    res.sendStatus(500)
  })


})

// this is my server request to delete the recipe from the database.
router.delete('/:id', (req, res) => {
  const recipeToDelete = req.params.id
  const sqlText = `DELETE FROM recipes WHERE id = $1`

  pool.query(sqlText, [recipeToDelete])
  .then(() => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log(`error in recipe router delete request ${error}`);
  })

})

router.get('/search/:recipesearch', (req, res) => {
  console.log('this is what i want to search for:', req.params.recipesearch)
  const sqlText = `SELECT * FROM recipes WHERE title ILIKE $1;`
  pool.query(sqlText, [`%${req.params.recipesearch}%`])
  .then((results) => {
    res.send(results.rows)
    //console.log('here are the results from the search', results.rows)
  }).catch((error) => {
    res.sendStatus(500);
    console.log('error in mhy search requrest', error)
  })
})

module.exports = router;
