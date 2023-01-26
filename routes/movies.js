const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/validators');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, createMovie);
router.delete('/movies/_id', deleteMovieValidator, deleteMovie);

module.exports = router;
