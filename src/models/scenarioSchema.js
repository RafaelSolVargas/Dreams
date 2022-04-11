module.exports = (sequelize, DataTypes) => {
  const Scenario = sequelize.define(
    'Scenario',
    {
      title: DataTypes.STRING,
      kind: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Scenario.associate = function associate(models) {
    this.hasMany(models.DreamDetail, { foreignKey: 'scenarioId', as: 'ddScenario', onUpdate: 'RESTRICT' });
  };

  return Scenario;
};
