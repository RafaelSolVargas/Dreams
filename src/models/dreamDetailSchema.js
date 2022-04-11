module.exports = (sequelize, DataTypes) => {
  const DreamDetail = sequelize.define(
    'DreamDetail',
    {
      recurringDream: DataTypes.BOOLEAN,
      formParticipationDuringDream: DataTypes.STRING,
      dreamRecord: DataTypes.TEXT,
      climaxDream: DataTypes.TEXT,
      upshotDream: DataTypes.STRING,
      dreamPeriod: DataTypes.STRING,
      dreamVisualizationColor: DataTypes.STRING,
      dreamMovement: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  DreamDetail.associate = function associate(models) {
    this.belongsTo(models.Scenario, { foreignKey: 'scenarioId', as: 'ddScenario', onUpdate: 'RESTRICT' });
    this.belongsTo(models.Scenario, { foreignKey: 'anotherScenarioId', as: 'ddScenarioTwo', onUpdate: 'RESTRICT' });
    this.belongsTo(models.Dream, { foreignKey: 'dreamId', as: 'ddDream' });
    this.belongsTo(models.Emotion, { foreignKey: 'emotionId', as: 'ddEmotion' });
    this.hasMany(models.Character, { foreignKey: 'dreamDetailId', as: 'ddCharacter' });
  };

  return DreamDetail;
};
