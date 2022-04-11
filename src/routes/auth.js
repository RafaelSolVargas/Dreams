const { Router } = require('express');
const { createUser, loginUser } = require('../controllers/auth');
const { createUserValidator, loginUserValidator } = require('../middlewares/validations/userValidation');

/* MiddleWares e Validator geral */
const { sanitizeData } = require('../middlewares/sanitization');

const authRouter = Router();
authRouter.use(sanitizeData);

authRouter
  .get('/', loginUserValidator, loginUser) // Login do usuário
  .post('/', createUserValidator, createUser); // Rota para cadastrar usuário

module.exports = authRouter;
