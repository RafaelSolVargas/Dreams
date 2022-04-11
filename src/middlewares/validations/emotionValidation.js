const { body } = require('express-validator');
const { Emotion } = require('../../models');

module.exports = {
  createEmotionValidation: [
    body('title')
      .notEmpty()
      .withMessage('Emotion cannot be empty')
      .custom(async (value) => {
        const emotion = await Emotion.findOne({ where: { title: value } });
        if (emotion) {
          throw new Error('Emotion already exists');
        }
      }),
  ],
  updateEmotionValidation: [
    body('title')
      .if(body('title').exists())
      .notEmpty()
      .withMessage('Emotion cannot be empty')
      .custom(async (value) => {
        const emotion = await Emotion.findOne({ where: { title: value } });
        if (emotion) {
          throw new Error('Emotion already exists');
        }
      }),
  ],
};
