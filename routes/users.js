const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  idValidator,
  updateUserValidator,
} = require('../middlewares/validators');

router.get('/users/me', idValidator, getUser);
router.patch('/users/me', updateUserValidator, updateUser);

module.exports = router;
