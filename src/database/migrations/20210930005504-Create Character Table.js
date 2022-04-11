module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Character', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dreamDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'DreamDetail', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userEmotionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Emotion', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      characterEmotionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Emotion', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      userAttitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      characterName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kinship: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      characterAttitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      associationCharacter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doesCharacterRepresentsYourEgo: Sequelize.BOOLEAN,
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('Character');
  },
};
