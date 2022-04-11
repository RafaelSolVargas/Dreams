const { Router } = require('express');

/* routes import */
const userRouter = require('./user');
const countryRouter = require('./country');
const emotionRouter = require('./emotions');
const admRouter = require('./adm');
const scenarioRouter = require('./scenario');
const authRouter = require('./auth');
const characterRouter = require('./character');
const dreamRouter = require('./dream');

const router = Router();

/* routers  */
router
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/dreams/characters', characterRouter)
  .use('/dreams', dreamRouter)
  .use('/admin/users', admRouter)
  .use('/admin/countries', countryRouter)
  .use('/admin/emotions', emotionRouter)
  .use('/admin/scenarios', scenarioRouter);

module.exports = router;
