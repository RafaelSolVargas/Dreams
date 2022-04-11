module.exports = {
  // Diz o que a migration vai fazer no banco de dados
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Phone', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' }, // Configura essa coluna para referenciar a tabela person na coluna id
        onUpdate: 'CASCADE', // quando tiver um update no id referenciado, cascade irá refletir a alteração para cá
        onDelete: 'CASCADE', // quando o id do usuário for excluído, vai excluir esse endereço também
      },
      ddi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  // O que deve ser desfeito caso dê problema no método up
  down: async (queryInterface) => {
    await queryInterface.dropTable('Phone');
  },
};
