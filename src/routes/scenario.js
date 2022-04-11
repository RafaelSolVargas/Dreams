const { Router } = require('express');
const {
  createScenario, getScenario, deleteScenario, getAll, updateScenario,
} = require('../controllers/scenario');

/* MiddleWares e Validator geral */
const {
  canCreateScenarios, canGetScenarios, canDeleteScenarios, canUpdateScenarios,
} = require('../middlewares/authorizations/scenariosAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { createScenarioValidation, updateScenarioValidation } = require('../middlewares/validations/scenarioValidation');

const scenarioRouter = Router();
scenarioRouter
  .use(sanitizeData)
  .use(isAuthenticated);

scenarioRouter
  .get('/', canGetScenarios, getAll) // Todos Scenarios
  .get('/:scenarioId', canGetScenarios, getScenario) // Um Scenario
  .post('/', canCreateScenarios, createScenarioValidation, createScenario) // Create Scenario
  .delete('/:scenarioId', canDeleteScenarios, deleteScenario) // Delete Scenario
  .put('/:scenarioId', canUpdateScenarios, updateScenarioValidation, updateScenario); // Update Scenario

module.exports = scenarioRouter;
