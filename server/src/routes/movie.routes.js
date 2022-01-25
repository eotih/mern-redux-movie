const router = require('express').Router();
const { catchErrors } = require('../handlers/error.handlers');
const { isAdmin, isAuthenticated } = require('../middlewares/auth.middlewares');
const { show, create, update, deleteMovie } = require('../controllers/movie.controllers');


router.get('/', catchErrors(show));
router.post('/',isAuthenticated, isAdmin, catchErrors(create));
router.put('/:id',isAuthenticated, isAdmin, catchErrors(update));
router.delete('/:id',isAuthenticated, isAdmin, catchErrors(deleteMovie));

module.exports = router