const { validationResult } = require('express-validator');
const { Character, DreamDetail, Dream } = require('../models');

module.exports = {
  getCharacter: async (req, res) => {
    const { characterId } = req.params;

    const character = await Character.findByPk(characterId);

    return res.status(200).json({ character });
  },
  getDDCharacters: async (req, res) => {
    const { dreamId } = req.params;

    const dream = await Dream.findByPk(dreamId, {
      include: {
        association: 'ddDream',
        include: {
          association: 'ddCharacter',
        },
      },
    });
    const characters = dream.ddDream.ddCharacter;
    return res.status(200).json({ characters });
  },
  createCharacter: async (req, res) => {
    const { dreamId } = req.params;

    const {
      userEmotionId,
      userAttitude,
      characterName,
      characterEmotionId,
      characterAttitude,
      kinship,
      associationCharacter,
      doesCharacterRepresentsYourEgo,
    } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    // Encontra o DD do Dream
    const dreamDetail = await DreamDetail.findOne({
      where: { dreamId },
    });

    // Creating character
    try {
      const character = await Character.create({
        dreamDetailId: dreamDetail.id,
        userEmotionId,
        userAttitude,
        characterName,
        characterEmotionId,
        characterAttitude,
        kinship,
        associationCharacter,
        doesCharacterRepresentsYourEgo,
      });

      return res.status(201).json({ character });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteCharacter: async (req, res) => {
    const { characterId } = req.params;

    try {
      const deleted = await Character.destroy({
        where: { id: characterId },
      });

      if (deleted) return res.status(200).json({ message: 'Character deleted' });

      return res.status(400).json({ message: 'Character does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateCharacter: async (req, res) => {
    const { characterId } = req.params;
    const {
      userEmotionId,
      userAttitude,
      characterName,
      characterEmotionId,
      characterAttitude,
      kinship,
      associationCharacter,
      doesCharacterRepresentsYourEgo,
    } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    try {
      const updated = await Character.update(
        {
          userEmotionId,
          userAttitude,
          characterName,
          characterEmotionId,
          characterAttitude,
          kinship,
          associationCharacter,
          doesCharacterRepresentsYourEgo,
        },
        {
          where: { id: characterId },
        },
      );

      if (updated) return res.status(200).json({ message: 'Character updated' });

      return res.status(400).json({ message: 'Character does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
