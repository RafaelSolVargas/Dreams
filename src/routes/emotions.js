const { Router } = require('express');
const {
  createEmotion, getEmotion, getAll, deleteEmotion, updateEmotion,
} = require('../controllers/emotion');

/* MiddleWares e Validator geral */
const {
  canCreateEmotions, canGetEmotions, canDeleteEmotions, canUpdateEmotions,
} = require('../middlewares/authorizations/emotionsAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { createEmotionValidation, updateEmotionValidation } = require('../middlewares/validations/emotionValidation');

const emotionRouter = Router();
emotionRouter
  .use(sanitizeData)
  .use(isAuthenticated);

emotionRouter
  .get('/', canGetEmotions, getAll) // Todas Emoções
  .get('/:emotionId', canGetEmotions, getEmotion) // Uma emoção
  .post('/', canCreateEmotions, createEmotionValidation, createEmotion) // Create Emoção
  .delete('/:emotionId', canDeleteEmotions, deleteEmotion) // Delete Emoção
  .put('/:emotionId', canUpdateEmotions, updateEmotionValidation, updateEmotion); // Update Emoção

module.exports = emotionRouter;
