const { check, body } = require('express-validator');
const {
  isOnlyLetters, isOnlyNumber, isOnlyNumberAndLetter, extractNumbers,
} = require('../../utils/functions');
const { Country } = require('../../models');

module.exports = {
  createAddressValidate: [
    /* CountryId - Existe */
    check('countryId')
      .notEmpty()
      .withMessage('Country Id cannot be empty')
      .isNumeric()
      .withMessage('Country Id must be a number')
      .bail()
      .custom(async (value) => {
        const country = await Country.findByPk(value);
        if (!country) { throw new Error('Country not found'); }
      }),

    /* FederativeUnit - Somente letras */
    check('federativeUnit')
      .notEmpty()
      .withMessage('Federative Unit cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Federative Unit name must have only letters'); }
      }),

    /* Cidade - Somente letras */
    check('city')
      .notEmpty()
      .withMessage('City cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('City name must have only letters'); }
      }),

    /* Distrito - Somente letras */
    check('district')
      .notEmpty()
      .withMessage('District cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('District name must have only letters'); }
      }),

    /* Public Place - Letras e Números */
    check('publicPlace')
      .notEmpty()
      .withMessage('Public Place cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in Public place'); }
      }),

    /* Address Number - Letras e Números */
    check('addressNumber')
      .notEmpty()
      .withMessage('Address number cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in address Number'); }
      }),

    /* Complemento - Letras e Números */
    check('complement')
      .if(body('complement').exists())
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in Complement'); }
      }),

    /* CEP - Números, + , () - */
    check('cep')
      .notEmpty()
      .withMessage('CEP cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in CEP'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),
  ],
  updateAddressValidate: [
    /* Country ID - existe  */
    check('countryId')
      .if(body('countryId').exists())
      .notEmpty()
      .withMessage('Country Id invalid')
      .isNumeric()
      .withMessage('Country Id must be integer')
      .bail()
      .custom(async (value) => {
        const country = await Country.findByPk(value);
        if (!country) { throw new Error('Country not found'); }
      }),

    /* Unidade federativa - Somente letras */
    check('federativeUnit')
      .if(body('federativeUnit').exists())
      .notEmpty()
      .withMessage('Federative Unit cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Federative Unit must have only letters'); }
      }),

    /* Cidade - Somente letras */
    check('city')
      .if(body('city').exists())
      .notEmpty()
      .withMessage('City cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('City name must have only letters'); }
      }),

    /* Distrito - Somente letras */
    check('district')
      .if(body('district').exists())
      .notEmpty()
      .withMessage('District cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('District name must have only letters'); }
      }),

    /* Public Place - Letras e Números */
    check('publicPlace')
      .if(body('publicPlace').exists())
      .notEmpty()
      .withMessage('Public Place cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in Public place'); }
      }),

    /* Address Number - Letras e Números */
    check('addressNumber')
      .if(body('addressNumber').exists())
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in address Number'); }
      }),

    /* Complemento - Letras e Números */
    check('complement')
      .if(body('complement').exists())
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('Invalid chars in Complement'); }
      }),

    /* CEP - Números, + , () - */
    check('cep')
      .if(body('cep').exists())
      .notEmpty()
      .withMessage('CEP cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in CEP'); }
      })
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

  ],
};
