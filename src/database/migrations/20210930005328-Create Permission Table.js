module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permission', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Role', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      all: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      value: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('Permission');
  },
};
