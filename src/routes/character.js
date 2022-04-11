const { Router } = require('express');
const {
  updateCharacter, getCharacter, deleteCharacter, createCharacter, getDDCharacters,
} = require('../controllers/character');

/* MiddleWares e Validator geral */
const {
  canCreateCharacters, canGetCharacters, canUpdateCharacters, canDeleteCharacters,
} = require('../middlewares/authorizations/charactersAutho');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { sanitizeData } = require('../middlewares/sanitization');
const { createCharacterValidate, updateCharacterValidate } = require('../middlewares/validations/characterValidation');
const { isCharacterOwner, isDreamOwner } = require('../middlewares/isOwner');

const characterRouter = Router();
characterRouter
  .use(sanitizeData)
  .use(isAuthenticated);

characterRouter
  .get('/:characterId', isCharacterOwner, canGetCharacters, getCharacter) // Char específico
  .get('/dream/:dreamId', isDreamOwner, canGetCharacters, getDDCharacters) // Todos os Chars de um sonho específico
  .post('/:dreamId', isDreamOwner, canCreateCharacters, createCharacterValidate, createCharacter) // Create Char para um Sonho
  .delete('/:characterId', isCharacterOwner, canDeleteCharacters, deleteCharacter) // Delete Character
  .put('/:characterId', isCharacterOwner, canUpdateCharacters, updateCharacterValidate, updateCharacter); // Update Character

module.exports = characterRouter;
