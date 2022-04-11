const { body, check } = require('express-validator');
const { Scenario } = require('../../models');

module.exports = {
  createScenarioValidation: [
    body('title')
      .notEmpty()
      .withMessage('Scenario cannot be empty')
      .custom(async (value) => {
        const scenario = await Scenario.findOne({ where: { title: value } });
        if (scenario) {
          throw new Error('Scenario already exists');
        }
      }),
    check('kind')
      .notEmpty()
      .withMessage('Kind cannot be empty'),
  ],
  updateScenarioValidation: [
    body('title')
      .if(body('title').exists())
      .notEmpty()
      .withMessage('Scenario cannot be empty')
      .custom(async (value) => {
        const scenario = await Scenario.findOne({ where: { title: value } });
        if (scenario) {
          throw new Error('Scenario already exists');
        }
      }),
    check('kind')
      .if(body('title').exists())
      .notEmpty()
      .withMessage('Kind cannot be empty'),
  ],
};
