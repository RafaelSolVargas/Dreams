const { validationResult } = require('express-validator');
const { sequelize } = require('../models');
const { Dream, DreamDetail, Character } = require('../models');

module.exports = {
  getDream: async (req, res) => {
    const { dreamId } = req.params;

    const dream = await Dream.findByPk(dreamId,
      {
        include:
        {
          association: 'ddDream',
          include: [
            { association: 'ddCharacter' },
            {
              association: 'ddScenario',
              attributes: ['title'],
            },
            {
              association: 'ddEmotion',
              attributes: ['title'],
            },
          ],
        },
      });

    return res.status(200).json({ dream });
  },
  getUserDreams: async (req, res) => {
    const { userId } = req.params;

    const dreams = await Dream.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({ dreams });
  },
  createDream: async (req, res) => {
    const { userId } = res.locals;
    const {
      title,
      dateTimeDream,
      moonPhase,
      menstrualCycle,
    } = req.body;
    const {
      anotherScenarioId,
      scenarioId,
      emotionId,
      recurringDream,
      formParticipationDuringDream,
      dreamRecord,
      climaxDream,
      upshotDream,
      dreamPeriod,
      dreamVisualizationColor,
      dreamMovement,
    } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    const creatingDreamT = await sequelize.transaction();

    try {
      // Cria o sonho
      const dream = await Dream.create({
        userId,
        title,
        dateTimeDream,
        moonPhase,
        menstrualCycle,
      }, { transaction: creatingDreamT });

      // Cria o detalhe do sonho
      const dreamDetail = await dream.createDdDream({
        anotherScenarioId,
        scenarioId,
        emotionId,
        recurringDream,
        formParticipationDuringDream,
        dreamRecord,
        climaxDream,
        upshotDream,
        dreamPeriod,
        dreamVisualizationColor,
        dreamMovement,
      }, { transaction: creatingDreamT });

      // Cria todos os characters do sonho caso tenham sido passados
      if (req.body.characters !== undefined) {
        const characters = await Promise.all(
          Object.values(req.body.characters).map((char, index) => {
            // Busca o respectivo char no body
            const {
              userEmotionId,
              userAttitude,
              characterName,
              characterEmotionId,
              characterAttitude,
              kinship,
              associationCharacter,
              doesCharacterRepresentsYourEgo,
            } = req.body.characters[index];

            // Cria o character
            const chars = dreamDetail.createDdCharacter({
              userEmotionId,
              userAttitude,
              characterName,
              characterEmotionId,
              characterAttitude,
              kinship,
              associationCharacter,
              doesCharacterRepresentsYourEgo,
            }, { transaction: creatingDreamT });

            return chars;
          }),
        );

        creatingDreamT.commit();
        return res.status(201).json({ dream, dreamDetail, characters });
      }

      creatingDreamT.commit();
      return res.status(201).json({ dream, dreamDetail });
    } catch (error) {
      creatingDreamT.rollback();
      return res.status(500).json({ error: error.message });
    }
  },
  deleteDream: async (req, res) => {
    const { dreamId } = req.params;

    try {
      const deleted = await Dream.destroy({
        where: { id: dreamId },
      });

      if (deleted) return res.status(200).json({ message: 'Dream deleted' });

      return res.status(400).json({ message: 'Dream does not exist' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateDream: async (req, res) => {
    const { dreamId } = req.params;
    const {
      title,
      dateTimeDream,
      moonPhase,
      menstrualCycle,
    } = req.body;
    const {
      emotionId,
      anotherScenarioId,
      scenarioId,
      recurringDream,
      formParticipationDuringDream,
      dreamRecord,
      climaxDream,
      upshotDream,
      dreamPeriod,
      dreamVisualizationColor,
      dreamMovement,
    } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors });

    // Transaction
    const updatingDreamT = await sequelize.transaction();

    // Update em Dream, DD e Characters
    try {
      const updatedDream = await Dream.update(
        {
          title,
          dateTimeDream,
          moonPhase,
          menstrualCycle,
        },
        {
          where: { id: dreamId },
          transaction: updatingDreamT,
        },
      );
      const updatedDD = await DreamDetail.update(
        {
          emotionId,
          anotherScenarioId,
          scenarioId,
          recurringDream,
          formParticipationDuringDream,
          dreamRecord,
          climaxDream,
          upshotDream,
          dreamPeriod,
          dreamVisualizationColor,
          dreamMovement,
        },
        {
          where: { dreamId },
          transaction: updatingDreamT,
        },
      );

      // Faz o Update de todos os characters que vieram, caso existam
      if (req.body.characters !== undefined) {
        const updatedChars = await Promise.all(
          Object.values(req.body.characters).map((char, index) => {
            // Busca o respectivo char no req.body
            const {
              characterId,
              userEmotionId,
              userAttitude,
              characterName,
              characterEmotionId,
              characterAttitude,
              kinship,
              associationCharacter,
              doesCharacterRepresentsYourEgo,
            } = req.body.characters[index];

            // Atualiza os dados com base no CharacterId
            const response = Character.update({
              userEmotionId,
              userAttitude,
              characterName,
              characterEmotionId,
              characterAttitude,
              kinship,
              associationCharacter,
              doesCharacterRepresentsYourEgo,
            }, {
              where: { id: characterId },
              transaction: updatingDreamT,
            });

            return response;
          }),
        );

        if (updatedDream && updatedDD && updatedChars) {
          updatingDreamT.commit();
          return res.status(200).json({ message: 'Dream updated' });
        }
        return res.status(400).json({ message: 'Dream updated was not successful' });
      }

      if (updatedDream && updatedDD) {
        updatingDreamT.commit();
        return res.status(200).json({ message: 'Dream updated' });
      }

      return res.status(400).json({ message: 'Dream updated was not successful' });
    } catch (error) {
      updatingDreamT.rollback();
      return res.status(500).json({ error: error.message });
    }
  },
};
