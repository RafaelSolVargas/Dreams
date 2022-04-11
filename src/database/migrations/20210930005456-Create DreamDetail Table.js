module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DreamDetail', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dreamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Dream', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      emotionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Emotion', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      scenarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Scenario', key: 'id' },
        onUpdate: 'RESTRICT', // Impede que um cenário seja apagado caso esteja sendo usado
        onDelete: 'RESTRICT',
      },
      anotherScenarioId: { // Pode ser nulo
        type: Sequelize.INTEGER,
        references: { model: 'Scenario', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      recurringDream: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      formParticipationDuringDream: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dreamRecord: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      climaxDream: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      upshotDream: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dreamPeriod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dreamVisualizationColor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dreamMovement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('DreamDetail');
  },
};
