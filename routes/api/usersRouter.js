const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/usersController.js');
  
  // /api/courses
  router.route('/').get(getCourses).post(createCourse);
  
  // /api/courses/:courseId
  router
    .route('/:courseId')
    .get(getSingleCourse)
    .put(updateCourse)
    .delete(deleteCourse);


module.exports = router;