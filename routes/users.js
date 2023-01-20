const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  userIdValidator,
  updateUserValidator,
} = require('../middlewares/validators');

router.get('/users/me', userIdValidator, getUser);
router.patch('/users/me', updateUserValidator, updateUser);

module.exports = router;
