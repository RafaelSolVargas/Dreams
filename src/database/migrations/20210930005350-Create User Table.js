module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickName: Sequelize.STRING,
      dateRegistration: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      homepage: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      gender: Sequelize.STRING,
      race: Sequelize.STRING,
      maritalStatus: Sequelize.STRING,
      degreeInstruction: Sequelize.STRING,
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('User');
  },
};
