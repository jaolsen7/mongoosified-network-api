const router = require('express').Router();
const usersRouter = require('./usersRouter');
const thoughtsRouter = require('./thoughtsRouter');

router.use('/users', usersRouter);
router.use('/thoughts', thoughtsRouter);

module.exports = router;