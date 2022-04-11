const { Router } = require('express');

/* Controllers e Validator de Usuário */
const {
  getUser, deleteUser, updateUser,
} = require('../controllers/user');
const { updateUserValidator } = require('../middlewares/validations/userValidation');

/* Controllers e Validator de Phone */
const {
  updatePhone, deletePhone, createPhone, getPhone, getUserPhones,
} = require('../controllers/phone');
const {
  createPhoneValidate, updatePhoneValidate,
} = require('../middlewares/validations/phoneValidation');

/* Controllers e Validator de Address */
const {
  updateAddresses, deleteAddresses, getAddresses, createAddresses, getUserAddresses,
} = require('../controllers/address');
const { updateAddressValidate, createAddressValidate } = require('../middlewares/validations/addressValidation');

/* MiddleWares e Validator geral */
const {
  canCreatePhones, canGetPhones, canDeletePhones, canUpdatePhones,
} = require('../middlewares/authorizations/phonesAutho');
const {
  canCreateAddresses, canGetAddresses, canDeleteAddresses, canUpdateAddresses,
} = require('../middlewares/authorizations/addressesAutho');
const {
  canGetHimself, canDeleteHimself, canUpdateHimself,
} = require('../middlewares/authorizations/userAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { isPhoneOwner, isAddressOwner, isUserOwner } = require('../middlewares/isOwner');

const userRouter = Router();
userRouter
  .use(sanitizeData)
  .use(isAuthenticated);

userRouter
  .get('/', canGetHimself, getUser) // USER - Ele mesmo
  .put('/', canUpdateHimself, updateUserValidator, updateUser) // Rota para atualizar um usuário
  .delete('/', canDeleteHimself, deleteUser) // Rota para o usuário se deletar

  .get('/phones/:phoneId', isPhoneOwner, canGetPhones, getPhone) // Phone específico
  .get('/phones/user/:userId', isUserOwner, canGetPhones, getUserPhones) // ADM - Todos Phones de um Usuário
  .get('/phones', canGetPhones, getUserPhones) // USER - Todos os seus
  .post('/phones', createPhoneValidate, canCreatePhones, createPhone) // Cria Phone
  .put('/phones/:phoneId', isPhoneOwner, canUpdatePhones, updatePhoneValidate, updatePhone) // Update de Phone
  .delete('/phones/:phoneId', isPhoneOwner, canDeletePhones, deletePhone) // Delete Phone

  .get('/addresses/:addressId', isAddressOwner, canGetAddresses, getAddresses) // Admin ou User buscar um específico
  .get('/addresses/user/:userId', isUserOwner, canGetAddresses, getUserAddresses) // ADM - Todos Endereços de um User
  .get('/addresses/', canGetAddresses, getUserAddresses) // USER - Todos os seus
  .post('/addresses', canCreateAddresses, createAddressValidate, createAddresses) // Users criar endereços
  .put('/addresses/:addressId', isAddressOwner, canUpdateAddresses, updateAddressValidate, updateAddresses) // Update Endereço
  .delete('/addresses/:addressId', isAddressOwner, canDeleteAddresses, deleteAddresses); // Deletar Endereço

module.exports = userRouter;
