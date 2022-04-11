const { validationResult } = require('express-validator');
const { Country } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const countries = await Country.findAll();

    res.status(200).json({ countries });
  },
  getCountry: async (req, res) => {
    const { countryId } = req.params;

    const country = await Country.findByPk(countryId);

    return res.status(200).json({ country });
  },
  deleteCountry: async (req, res) => {
    const { countryId } = req.params;

    try {
      const deleted = await Country.destroy({
        where: { id: countryId },
      });

      if (deleted) return res.status(200).json({ message: 'Country deleted' });

      return res.status(400).json({ error: 'Country does not exists' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  createCountry: async (req, res) => {
    const { code, name } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ Validation_Errors: errors }); }

    try {
      const country = await Country.create({ code, name });

      return res.status(201).json({ Country: country });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateCountry: async (req, res) => {
    const { countryId } = req.params;
    const { code, name } = req.body;

    try {
      const updated = await Country.update(
        { code, name },
        {
          where: { id: countryId },
        },
      );

      if (updated) return res.status(200).json({ message: 'Country updated' });
      return res.status(400).json({ error: 'Country does not exists' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
