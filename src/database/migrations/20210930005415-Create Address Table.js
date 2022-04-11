module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Address', {
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
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Country', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      federativeUnit: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      cep: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      publicPlace: {
        type: Sequelize.STRING,
      },
      addressNumber: {
        type: Sequelize.STRING,
      },
      complement: Sequelize.STRING,
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('Address');
  },
};
