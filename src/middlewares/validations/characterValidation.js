const { check, body } = require('express-validator');
const { isOnlyLetters } = require('../../utils/functions');
const appTypes = require('../../utils/appTypes');
const { Emotion } = require('../../models');

module.exports = {
  createCharacterValidate: [
    /* User Emotion Id - Existe */
    check('userEmotionId')
      .notEmpty()
      .withMessage('User Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('User Emotion not found');
      }),

    /* Character Emotion Id - Existe */
    check('characterEmotionId')
      .notEmpty()
      .withMessage('Character Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('Character Emotion not found');
      }),

    /* Person Attitude - Pertence à ENUM */
    check('userAttitude')
      .notEmpty()
      .withMessage('Your attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`Your attitude must be one of: ${appTypes.attitudes}`),

    /* Character Name - Somente letras */
    check('characterName')
      .notEmpty()
      .withMessage('Character Name cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Character Name must have only letters'); }
      }),

    /* Kinship - Pertence à ENUM */
    check('kinship')
      .notEmpty()
      .withMessage('Kinship cannot be empty')
      .bail()
      .isIn(appTypes.kinship)
      .withMessage(`Your attitude must be one of: ${appTypes.kinship}`),

    /* Character Attitude - Pertence à ENUM */
    check('characterAttitude')
      .notEmpty()
      .withMessage('The Character attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`The Character attitude must be one of: ${appTypes.attitudes}`),

    /* Association Character - Letras */
    check('associationCharacter')
      .notEmpty()
      .withMessage('Association Character cannot be empty')
      .bail()
      .isIn(appTypes.associations)
      .withMessage(`The Character attitude must be one of: ${appTypes.associations}`),

    /* Represents Ego - Boolean */
    check('doesCharacterRepresentsYourEgo')
      .notEmpty()
      .withMessage('You must specify if Character Represents your ego')
      .bail()
      .isBoolean()
      .withMessage('This data must be boolean'),
  ],
  updateCharacterValidate: [
    /* User Emotion Id - Existe */
    check('userEmotionId')
      .if(body('userEmotionId').exists())
      .notEmpty()
      .withMessage('User Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('User Emotion not found');
      }),

    /* Character Emotion Id - Existe */
    check('characterEmotionId')
      .if(body('characterEmotionId').exists())
      .notEmpty()
      .withMessage('Character Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('Character Emotion not found');
      }),
    /* Person Attitude - Pertence à ENUM */
    check('userAttitude')
      .if(body('userAttitude').exists())
      .notEmpty()
      .withMessage('Your attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`Your attitude must be one of: ${appTypes.attitudes}`),

    /* Character Name - Somente letras */
    check('characterName')
      .if(body('characterName').exists())
      .notEmpty()
      .withMessage('Character Name cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Character Name must have only letters'); }
      }),

    /* KinShip - Pertence à ENUM */
    check('kinship')
      .if(body('kinship').exists())
      .notEmpty()
      .withMessage('Kinship cannot be empty')
      .bail()
      .isIn(appTypes.kinship)
      .withMessage(`Your attitude must be one of: ${appTypes.kinship}`),

    /* Character Attitude - Pertence à ENUM */
    check('characterAttitude')
      .if(body('characterAttitude').exists())
      .notEmpty()
      .withMessage('The Character attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`The Character attitude must be one of: ${appTypes.attitudes}`),

    /* Association Character - Letras */
    check('associationCharacter')
      .if(body('associationCharacter').exists())
      .notEmpty()
      .withMessage('Association Character cannot be empty')
      .bail()
      .isIn(appTypes.associations)
      .withMessage(`The Character attitude must be one of: ${appTypes.associations}`),

    /* Represents Ego - Boolean */
    check('doesCharacterRepresentsYourEgo')
      .if(body('doesCharacterRepresentsYourEgo').exists())
      .notEmpty()
      .withMessage('You must specify if Character Represents your ego')
      .bail()
      .isBoolean()
      .withMessage('This data must be boolean'),
  ],
};
