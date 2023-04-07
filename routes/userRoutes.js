const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUser', userController.getAllUser);
router.post('/createUser', userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
