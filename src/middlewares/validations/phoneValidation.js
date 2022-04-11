const { check, body } = require('express-validator');
const { isOnlyNumber, extractNumbers } = require('../../utils/functions');
const appTypes = require('../../utils/appTypes');

module.exports = {
  createPhoneValidate: [
    /* Number - Números, + , () - */
    check('number')
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in number'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    check('ddi')
      .notEmpty()
      .withMessage('DDI cannot be empty')
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in ddi'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    check('ddd')
      .notEmpty()
      .withMessage('DDD cannot be empty')
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in ddd'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    /* Number Type - Enum */
    check('type')
      .isIn(appTypes.numberType)
      .withMessage(`Number type must be one of: ${appTypes.numberType}`),
  ],
  updatePhoneValidate: [
    /* Number - Números, + , () - */
    check('number')
      .if(body('number').exists())
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in Number'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    check('ddi')
      .if(body('ddi').exists())
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in ddi'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    check('ddd')
      .if(body('ddd').exists())
      .custom(async (value) => {
        if (!await isOnlyNumber(value)) { throw new Error('Invalid chars in ddd'); }
      })
      .bail()
      .customSanitizer((value) => {
        const onlyNumbers = extractNumbers(value); // Extrai números
        return onlyNumbers;
      }),

    /* Type - ENUM */
    check('type')
      .if(body('type').exists())
      .isIn(appTypes.numberType)
      .withMessage(`Number type must be one of: ${appTypes.numberType}`),
  ],
};
