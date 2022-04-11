const { validationResult } = require('express-validator');
const { Scenario } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const scenarios = await Scenario.findAll({});

    return res.status(200).json({ scenarios });
  },
  getScenario: async (req, res) => {
    const { scenarioId } = req.params;

    const scenario = await Scenario.findByPk(scenarioId);

    return res.status(200).json({ scenario });
  },
  createScenario: async (req, res) => {
    const { title, kind } = req.body;

    /* Validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors }); }

    /* Scenario Creation */
    try {
      const scenario = await Scenario.create({ title, kind });

      return res.status(201).json({ scenario });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  deleteScenario: async (req, res) => {
    const { scenarioId } = req.params;

    try {
      const deleted = await Scenario.destroy({
        where: { id: scenarioId },
      });

      if (deleted) return res.status(200).json({ message: 'Scenario deleted' });
      return res.status(400).json({ message: 'Scenario does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateScenario: async (req, res) => {
    const { scenarioId } = req.params;
    const { title, kind } = req.body;

    try {
      const scenario = await Scenario.update(
        { title, kind },
        {
          where: { id: scenarioId },
        },
      );

      if (scenario) return res.status(200).json({ message: 'Scenario updated' });
      return res.status(400).json({ message: 'Scenario does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
