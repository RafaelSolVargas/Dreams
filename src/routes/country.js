const { Router } = require('express');
const {
  getAll, createCountry, deleteCountry, getCountry, updateCountry,
} = require('../controllers/country');

/* MiddleWares e Validator geral */
const {
  canCreateCountries, canGetCountries, canDeleteCountries, canUpdateCountries,
} = require('../middlewares/authorizations/countriesAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { createCountryValidation, updateCountryValidation } = require('../middlewares/validations/countryValidation');

const countryRouter = Router();
countryRouter
  .use(sanitizeData)
  .use(isAuthenticated);

countryRouter
  .get('/', canGetCountries, getAll) // Todos países
  .get('/:countryId', canGetCountries, getCountry) // País específico
  .post('/', canCreateCountries, createCountryValidation, createCountry) // Cria um país
  .delete('/:countryId', canDeleteCountries, deleteCountry) // Deleta um país específico
  .put('/:countryId', canUpdateCountries, updateCountryValidation, updateCountry); // Atualiza um país em específico

module.exports = countryRouter;
