const { Router } = require('express');
const {
  getAll, getUser, deleteUser, assignUser, updateUser,
} = require('../controllers/adm');
const { assignUserValidation } = require('../middlewares/validations/admValidation');
const { updateUserValidator } = require('../middlewares/validations/userValidation');

/* MiddleWares e Validator geral */
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const {
  canAssignUser, canGetAllUsers, canDeleteUsers, canUpdateUsers, canGetUsers,
} = require('../middlewares/authorizations/userAutho');
const { isUserOwner } = require('../middlewares/isOwner');

const admRouter = Router();
admRouter
  .use(sanitizeData)
  .use(isAuthenticated);

admRouter
  .delete('/:userId', canDeleteUsers, isUserOwner, deleteUser) // Rota para o ADM deletar um usuário
  .get('/', canGetAllUsers, getAll) // Rota para o ADM buscar todos os usuários
  .get('/:userId', isUserOwner, canGetUsers, getUser) // Rota para o ADM buscar um usuário específico
  .put('/:userId', isUserOwner, canUpdateUsers, updateUserValidator, updateUser) // Adm alterar algo do Usuário
  .put('/assign-user/:userId', canAssignUser, assignUserValidation, assignUser); // Alterar a Role de algum Usuário

module.exports = admRouter;
