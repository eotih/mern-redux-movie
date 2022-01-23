const router = require('express').Router();
const { catchErrors } = require('../handlers/error.handlers');
const { isAdmin, isAuthenticated } = require('../middlewares/auth.middlewares');
const { show, updateProfile, deleteUser, resetPassword, getById } = require('../controllers/user.controllers');


router.get('/', isAuthenticated, isAdmin, catchErrors(show))
router.get('/:id', isAuthenticated, getById)
router.put('/password/:id', isAuthenticated, catchErrors(resetPassword))
router.put('/:id', isAuthenticated, catchErrors(updateProfile))
router.delete('/:id', isAuthenticated, isAdmin, catchErrors(deleteUser))


module.exports = router