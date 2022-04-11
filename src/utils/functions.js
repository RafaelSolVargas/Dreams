const { User, Character } = require('../models');

module.exports = {
  // Verifica se uma string possui somente letras
  isOnlyLetters: async (name) => {
    const arrayName = name.trim().split(' ');
    let isCorrect = true;
    await Array.prototype.forEach.call(arrayName, (word) => {
      if (word.search(/[^A-zÁ-ù]/) !== -1) { isCorrect = false; }
    });
    return isCorrect;
  },
  // Verifica se uma string possui somente números e alguns chars específicos
  isOnlyNumber: async (number) => {
    const arrayNumber = number.trim().split(' ');
    let isCorrect = true;
    await Array.prototype.forEach.call(arrayNumber, (word) => {
      if (word.search(/[^0-9().,/+-]/) !== -1) { isCorrect = false; }
    });
    return isCorrect;
  },
  // Verifica se a string possui somente números e letras
  isOnlyNumberAndLetter: async (value) => {
    const array = value.trim().split(' ');
    let isCorrect = true;
    await Array.prototype.forEach.call(array, (word) => {
      if (word.search(/[^A-zÁ-ù0-9]/) !== -1) { isCorrect = false; }
    });
    return isCorrect;
  },
  // Procura por um User no sistema por meio do email
  searchEmail: async (value) => {
    const user = await User.findOne({ where: { email: value } });
    if (user) { return true; }
    return false;
  },
  // Retorna somente os números de um valor
  extractNumbers: async (number) => {
    const onlyNumbers = number.replace(/[^0-9]/g, '');
    return onlyNumbers;
  },
  // Testa se a senha se enquadra nos padrões do sistema, 1 Maiúsculo, 1 minúsculo, 1 numero
  // 1 especial e entre 8 e 16 dígitos
  validatePassword: async (pass) => {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?$^+=!*@()%&]).{8,16}$/.test(pass)
    ) { return false; }
    return true;
  },
  isCharacterOwner: async (userId, charId) => {
    const character = await Character.findByPk(charId, {
      include: {
        association: 'ddCharacter',
        include: { association: 'ddDream' },
      },
    });

    if (character.ddCharacter.ddDream.userId !== userId) return false;
    return true;
  },
};
