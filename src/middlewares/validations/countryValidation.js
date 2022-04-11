const { body, check } = require('express-validator');
const { isOnlyNumber } = require('../../utils/functions');
const { Country } = require('../../models');

module.exports = {
  createCountryValidation: [
    body('name')
      .notEmpty()
      .withMessage('Country cannot be empty')
      .custom(async (value) => {
        const country = await Country.findOne({ where: { name: value } });
        if (country) throw new Error('Country already exists');
      }),
    check('code')
      .notEmpty()
      .withMessage('Code cannot be empty')
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) throw new Error('Invalid characters in Code');
      }),
  ],
  updateCountryValidation: [
    body('name')
      .if(body('name').exists())
      .notEmpty()
      .withMessage('Country cannot be empty')
      .custom(async (value) => {
        const country = await Country.findOne({ where: { name: value } });
        if (country) throw new Error('Country already exists');
      }),
    check('code')
      .if(body('code').exists())
      .notEmpty()
      .withMessage('Code cannot be empty')
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) throw new Error('Invalid characters in Code');
      }),
  ],
};
