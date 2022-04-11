module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dream', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateTimeRegistration: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateTimeDream: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      moonPhase: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menstrualCycle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('Dream');
  },
};
