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
  console.log('here is the user id', user)

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
  // POST route code here
});

module.exports = router;
