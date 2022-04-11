const { check, body } = require('express-validator');
const { isOnlyNumberAndLetter, isOnlyLetters, isCharacterOwner } = require('../../utils/functions');
const appTypes = require('../../utils/appTypes');
const { Emotion, Scenario } = require('../../models');

module.exports = {
  createDreamValidate: [
    /* Title - Existe, Letras e Números */
    check('title')
      .notEmpty()
      .withMessage('Title cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) throw new Error('Invalid characters in Title');
      }),

    /* Date Time Dream - Data */
    check('dateTimeDream')
      .isDate()
      .withMessage('Insert a date with the format YYYY-MM-DD'),

    /* Moon Phase - Pertence à ENUM */
    check('moonPhase')
      .notEmpty()
      .withMessage('Moon Phase cannot be empty')
      .bail()
      .isIn(appTypes.moonPhase)
      .withMessage(`Moon Phase must be one of: ${appTypes.moonPhase}`),

    /* Moon Phase - Pertence à ENUM */
    check('menstrualCycle')
      .notEmpty()
      .withMessage('Menstrual Cycle cannot be empty')
      .bail()
      .isIn(appTypes.menstrualCycle)
      .withMessage(`Moon Phase must be one of: ${appTypes.menstrualCycle}`),

    /* Emotion Id - Existe */
    check('emotionId')
      .notEmpty()
      .withMessage('Emotion Id cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('Emotion id not found');
      }),

    /* Scenario Id - Existe */
    check('scenarioId')
      .notEmpty()
      .withMessage('Scenario Id cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Scenario.findByPk(value)) throw new Error('Scenario id not found');
      }),

    /* DreamDetail Emotion Id - Existe */
    check('anotherScenarioId')
      .if(body('anotherScenarioId').exists())
      .notEmpty()
      .withMessage('Another Scenario cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Scenario.findByPk(value)) throw new Error('Another Scenario not found');
      }),

    /* Recurring Dream - Boolean */
    check('recurringDream')
      .notEmpty()
      .withMessage('You must specify if it is a recurring Dream')
      .bail()
      .isBoolean()
      .withMessage('Recurring Dram must be boolean'),

    /* Form Participation During Dream - Existe */
    check('formParticipationDuringDream')
      .notEmpty()
      .withMessage('Form Participation During Dream cannot be empty'),

    /* Dream Record - Existe */
    check('dreamRecord')
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* Climax Dream - Existe */
    check('climaxDream')
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* upshot Dream - Existe */
    check('upshotDream')
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* Dream Period - Pertence à ENUM */
    check('dreamPeriod')
      .notEmpty()
      .withMessage('Dream Period cannot be empty')
      .bail()
      .isIn(appTypes.dreamPeriod)
      .withMessage(`Dream Period must be one of: ${appTypes.dreamPeriod}`),

    /* Dream Visualization Color - Pertence à ENUM */
    check('dreamVisualizationColor')
      .notEmpty()
      .withMessage('Dream Color cannot be empty')
      .bail()
      .isIn(appTypes.dreamColor)
      .withMessage(`Dream Color must be one of: ${appTypes.dreamColor}`),

    /* Dream Movement Color - Pertence à ENUM */
    check('dreamMovement')
      .notEmpty()
      .withMessage('Dream Movement cannot be empty')
      .bail()
      .isIn(appTypes.dreamMovement)
      .withMessage(`Dream Movement must be one of: ${appTypes.dreamMovement}`),

    /* User Emotion Id - Existe */
    check('characters.*.userEmotionId')
      .notEmpty()
      .withMessage('User Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('User Emotion not found');
      }),

    /* Character Emotion Id - Existe */
    check('characters.*.characterEmotionId')
      .notEmpty()
      .withMessage('Character Emotion cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('Character Emotion not found');
      }),

    /* Person Attitude - Pertence à ENUM */
    check('characters.*.userAttitude')
      .notEmpty()
      .withMessage('Your attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`Your attitude must be one of: ${appTypes.attitudes}`),

    /* Character Name - Somente letras */
    check('characters.*.characterName')
      .notEmpty()
      .withMessage('Character Name cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyLetters(value)) { throw new Error('Character Name must have only letters'); }
      }),

    /* Kinship - Pertence à ENUM */
    check('characters.*.kinship')
      .notEmpty()
      .withMessage('Kinship cannot be empty')
      .bail()
      .isIn(appTypes.kinship)
      .withMessage(`Your attitude must be one of: ${appTypes.kinship}`),

    /* Character Attitude - Pertence à ENUM */
    check('characters.*.characterAttitude')
      .notEmpty()
      .withMessage('The Character attitude cannot be empty')
      .bail()
      .isIn(appTypes.attitudes)
      .withMessage(`The Character attitude must be one of: ${appTypes.attitudes}`),

    /* Association Character - Letras */
    check('characters.*.associationCharacter')
      .notEmpty()
      .withMessage('Association Character cannot be empty')
      .bail()
      .isIn(appTypes.associations)
      .withMessage(`The Character attitude must be one of: ${appTypes.associations}`),

    /* Represents Ego - Boolean */
    check('characters.*.doesCharacterRepresentsYourEgo')
      .notEmpty()
      .withMessage('You must specify if Character Represents your ego')
      .bail()
      .isBoolean()
      .withMessage('This data must be boolean'),
  ],
  updateDreamValidate: [
    /* Title - Existe */
    check('title')
      .if(body('title').exists())
      .notEmpty()
      .withMessage('Title cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await isOnlyNumberAndLetter(value)) throw new Error('Invalid characters in Title');
      }),

    /* Date Time Dream - Data */
    check('dateTimeDream')
      .if(body('dateTimeDream').exists())
      .isDate()
      .withMessage('Insert a date with the format YYYY-MM-DD'),

    /* Moon Phase - Pertence à ENUM */
    check('moonPhase')
      .if(body('moonPhase').exists())
      .notEmpty()
      .withMessage('Moon Phase cannot be empty')
      .bail()
      .isIn(appTypes.moonPhase)
      .withMessage(`Moon Phase must be one of: ${appTypes.moonPhase}`),

    /* Moon Phase - Pertence à ENUM */
    check('menstrualCycle')
      .if(body('menstrualCycle').exists())
      .notEmpty()
      .withMessage('Menstrual Cycle cannot be empty')
      .bail()
      .isIn(appTypes.menstrualCycle)
      .withMessage(`Moon Phase must be one of: ${appTypes.menstrualCycle}`),

    /* Emotion Id - Existe */
    check('emotionId')
      .if(body('emotionId').exists())
      .notEmpty()
      .withMessage('Emotion Id cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Emotion.findByPk(value)) throw new Error('Emotion id not found');
      }),

    /* Scenario Id - Existe */
    check('scenarioId')
      .if(body('scenarioId').exists())
      .notEmpty()
      .withMessage('Scenario Id cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Scenario.findByPk(value)) throw new Error('Scenario id not found');
      }),

    /* DreamDetail Emotion Id - Existe */
    check('anotherScenarioId')
      .if(body('anotherScenarioId').exists())
      .notEmpty()
      .withMessage('Another Scenario cannot be empty')
      .bail()
      .custom(async (value) => {
        if (!await Scenario.findByPk(value)) throw new Error('Another Scenario not found');
      }),

    /* Recurring Dream - Boolean */
    check('recurringDream')
      .if(body('recurringDream').exists())
      .notEmpty()
      .withMessage('You must specify if it is a recurring Dream')
      .bail()
      .isBoolean()
      .withMessage('Recurring Dram must be boolean'),

    /* Form Participation During Dream - Existe */
    check('formParticipationDuringDream')
      .if(body('formParticipationDuringDream').exists())
      .notEmpty()
      .withMessage('Form Participation During Dream cannot be empty'),

    /* DreamDetail Name - Existe */
    check('dreamRecord')
      .if(body('dreamRecord').exists())
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* Climax Dream - Existe */
    check('climaxDream')
      .if(body('climaxDream').exists())
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* upshot Dream - Existe */
    check('upshotDream')
      .if(body('upshotDream').exists())
      .notEmpty()
      .withMessage('Dream Record cannot be empty'),

    /* Dream Period - Pertence à ENUM */
    check('dreamPeriod')
      .if(body('dreamPeriod').exists())
      .notEmpty()
      .withMessage('Dream Period cannot be empty')
      .bail()
      .isIn(appTypes.dreamPeriod)
      .withMessage(`Dream Period must be one of: ${appTypes.dreamPeriod}`),

    /* Dream Visualization Color - Pertence à ENUM */
    check('dreamVisualizationColor')
      .if(body('dreamVisualizationColor').exists())
      .notEmpty()
      .withMessage('Dream Color cannot be empty')
      .bail()
      .isIn(appTypes.dreamColor)
      .withMessage(`Dream Color must be one of: ${appTypes.dreamColor}`),

    /* Dream Movement Color - Pertence à ENUM */
    check('dreamMovement')
      .if(body('dreamMovement').exists())
      .notEmpty()
      .withMessage('Dream Movement cannot be empty')
      .bail()
      .isIn(appTypes.dreamMovement)
      .withMessage(`Dream Movement must be one of: ${appTypes.dreamMovement}`),

    /* Character Id - Pertence ao user */
    check('characters.*.characterId')
      .notEmpty()
      .withMessage('Character Id cannot be empty')
      .isInt()
      .withMessage('Character Id must be Integer')
      .bail()
      .custom(async (value, { req }) => {
        if (!await isCharacterOwner(req.userId, value)) throw new Error('Character Id is not yours');
      }),

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
    check('characters.*.characterEmotionId')
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
