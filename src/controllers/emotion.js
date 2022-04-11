const { validationResult } = require('express-validator');
const { Emotion } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const emotions = await Emotion.findAll();

    return res.status(200).json({ emotions });
  },
  getEmotion: async (req, res) => {
    const { emotionId } = req.params;

    // Busca a emoção específica
    const emotion = await Emotion.findByPk(emotionId);

    return res.status(200).json({ emotion });
  },
  createEmotion: async (req, res) => {
    const { title } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    // Creating emotion
    try {
      const emotion = await Emotion.create({ title });

      return res.status(201).json({ emotion });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteEmotion: async (req, res) => {
    const { emotionId } = req.params;

    try {
      const deleted = await Emotion.destroy({
        where: { id: emotionId },
      });

      if (deleted) return res.status(200).json({ message: 'Emotion deleted' });

      return res.status(400).json({ message: 'Emotion does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateEmotion: async (req, res) => {
    const { emotionId } = req.params;
    const { title } = req.body;

    try {
      const updated = await Emotion.update(
        { title },
        {
          where: { id: emotionId },
        },
      );

      if (updated) return res.status(200).json({ message: 'Emotion updated' });

      return res.status(400).json({ message: 'Emotion does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
