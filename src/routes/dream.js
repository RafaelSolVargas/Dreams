const { Router } = require('express');
const {
  updateDream, getDream, deleteDream, createDream, getUserDreams,
} = require('../controllers/dream');

/* MiddleWares e Validator geral */
const {
  canCreateDreams, canGetDreams, canDeleteDreams, canUpdateDreams,
} = require('../middlewares/authorizations/dreamsAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { createDreamValidate, updateDreamValidate } = require('../middlewares/validations/dreamValidation');
const { isDreamOwner, isUserOwner } = require('../middlewares/isOwner');

const dreamRouter = Router();
dreamRouter
  .use(sanitizeData)
  .use(isAuthenticated);

dreamRouter
  .get('/user/:userId', isUserOwner, canGetDreams, getUserDreams) // ADM - Todos de um Usuário
  .get('/', canGetDreams, getUserDreams) // USER - Seus
  .get('/:dreamId', isDreamOwner, canGetDreams, getDream) // Sonho específico
  .post('/', canCreateDreams, createDreamValidate, createDream) // Create Dream
  .delete('/:dreamId', isDreamOwner, canDeleteDreams, deleteDream) // Delete Dream
  .put('/:dreamId', isDreamOwner, canUpdateDreams, updateDreamValidate, updateDream); // Update Dream

module.exports = dreamRouter;
