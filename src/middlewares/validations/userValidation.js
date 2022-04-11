const { check, body } = require('express-validator');
const { User, Country } = require('../../models');
const {
  isOnlyLetters, searchEmail, extractNumbers, validatePassword, isOnlyNumber, isOnlyNumberAndLetter,
} = require('../../utils/functions');
const appTypes = require('../../utils/appTypes');

module.exports = {
  createUserValidator: [
    /* Name - Somente Letras */
    check('name')
      .notEmpty()
      .withMessage('Name cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Name must have only letters'); }
      }),

    /* NickName - Letras e Números */
    check('nickName')
      .if(body('nickName').exists())
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('NickName must have only letters and numbers'); }
      }),

    /* Email - Único */
    check('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Email invalid')
      .normalizeEmail()
      .bail()
      .custom(async (value) => {
        if (await searchEmail(value)) { throw new Error('Email already used'); }
      }),

    /* Senha - 1 minúscula 1 maiúscula, 1 especial, 1 number, 8-16 */
    check('password')
      .notEmpty()
      .withMessage('New password cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await validatePassword(value)) {
          throw new Error('The password must have Minimum 10 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character');
        }
      }),

    /* dataNascimento - YYYY-MM-DD */
    check('dateBirth')
      .isDate()
      .withMessage('Insert a date with the format YYYY-MM-DD'),

    /* Verifica se a nacionalidade está no ENUM */
    check('nationality')
      .isIn(appTypes.nationality)
      .withMessage(`Invalid Marital Status, use one of: ${appTypes.nationality}`),

    /* Verifica se o gênero está no ENUM */
    check('gender')
      .isIn(appTypes.genders)
      .withMessage(`Invalid Gender, use one of: ${appTypes.genders}`),

    /* Verifica se o Estado Civil está no ENUM */
    check('maritalStatus')
      .isIn(appTypes.maritalStatus)
      .withMessage(`Invalid Marital Status, use one of: ${appTypes.maritalStatus}`),

    /* Verifica se o Nível de instrução está no ENUM */
    check('degreeInstruction')
      .isIn(appTypes.degreeInstruction)
      .withMessage(`Invalid Degree Instruction, use one of: ${appTypes.degreeInstruction}`),

    /* Verifica se a raça está no ENUM */
    check('race')
      .isIn(appTypes.races)
      .withMessage(`Invalid Race, use one of: ${appTypes.races}`),

    /* Homepage - URL */
    check('homepage')
      .if(body('homepage').exists())
      .isURL()
      .withMessage('Insert a valid Url for HomePage'),

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
  updateUserValidator: [
    /* Email - único */
    check('email')
      .if(body('email').exists())
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Email invalid')
      .bail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { email: value } });
        if (user && user.id !== Number(req.userId)) {
          throw new Error('Email already used');
        }
      }),

    /* Verifica se a senha para alterar é válida */
    check('password')
      .if(body('password').exists())
      .notEmpty()
      .withMessage('New password cannot be empty')
      .custom(async (value) => {
        if (!await validatePassword(value)) {
          throw new Error('The password must have Minimum 10 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character');
        }
      })
      .bail()
      .custom(async (value, { req }) => {
        const user = await User.findByPk(req.userId);
        if (user.password === value) {
          throw new Error('New password cannot be same as the old one');
        }
      }),

    /* Name - Somente Letras */
    check('name')
      .if(body('name').exists())
      .notEmpty().withMessage('Name cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Name must have only letters'); }
      }),

    /* NickName - Letras e Números */
    check('nickName')
      .if(body('nickName').exists())
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) { throw new Error('NickName must have only letters and numbers'); }
      }),

    /* Verifica se o gênero está no ENUM */
    check('gender')
      .if(body('gender').exists())
      .isIn(appTypes.genders)
      .withMessage(`Invalid Gender, use one of: ${appTypes.genders}`),

    /* Verifica se a nacionalidade está no ENUM */
    check('nationality')
      .isIn(appTypes.nationality)
      .withMessage(`Invalid Marital Status, use one of: ${appTypes.nationality}`),

    /* Verifica se o Estado Civil está no ENUM */
    check('maritalStatus')
      .if(body('maritalStatus').exists())
      .isIn(appTypes.maritalStatus)
      .withMessage(`Invalid Marital Status, use one of: ${appTypes.maritalStatus}`),

    /* Verifica se o Nível de instrução está no ENUM */
    check('degreeInstruction')
      .if(body('degreeInstruction').exists())
      .isIn(appTypes.degreeInstruction)
      .withMessage(`Invalid Degree Instruction, use one of: ${appTypes.degreeInstruction}`),

    /* Verifica se a raça está no ENUM */
    check('race')
      .if(body('race').exists())
      .isIn(appTypes.races)
      .withMessage(`Invalid Race, use one of: ${appTypes.races}`),

    /* Data - YYYY-MM-DD */
    check('dateBirth')
      .if(body('dateBirth').exists())
      .isDate()
      .withMessage('Insert a date with the format YYYY-MM-DD'),
  ],
  loginUserValidator: [
    check('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Email is invalid')
      .bail()
      .custom(async (value) => {
        if (!await searchEmail(value)) { throw new Error('User not found'); }
      }),
    check('password')
      .notEmpty()
      .withMessage('Password cannot be empty'),
  ],
};
