const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/usersController.js');
  
  // /api/users
  router.route('/')
    .get(getUsers)
    .post(createUser);
  
  // /api/users/:userId
  router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

  // /api/users/friends/:friendId
  router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;