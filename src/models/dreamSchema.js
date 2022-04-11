module.exports = (sequelize, DataTypes) => {
  const Dream = sequelize.define(
    'Dream',
    {
      title: DataTypes.STRING,
      dateTimeDream: DataTypes.DATEONLY,
      moonPhase: DataTypes.STRING,
      menstrualCycle: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true, // Cria as colunas updatedAt e createdAt
      updatedAt: false, // Remove a coluna updatedAt
      createdAt: 'dateTimeRegistration', //  Troca o nome da coluna createdAt
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Dream.associate = function associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'userDream' });
    this.hasOne(models.DreamDetail, { foreignKey: 'dreamId', as: 'ddDream' });
  };

  return Dream;
};
