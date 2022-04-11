module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    'Character',
    {
      userAttitude: DataTypes.STRING,
      characterName: DataTypes.STRING,
      kinship: DataTypes.STRING,
      characterAttitude: DataTypes.STRING,
      associationCharacter: DataTypes.STRING,
      doesCharacterRepresentsYourEgo: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    },
  );

  Character.associate = function associate(models) {
    this.belongsTo(models.DreamDetail, { foreignKey: 'dreamDetailId', as: 'ddCharacter' });
    this.belongsTo(models.Emotion, { foreignKey: 'userEmotionId', as: 'userEmotion' });
    this.belongsTo(models.Emotion, { foreignKey: 'characterEmotionId', as: 'characterEmotion' });
  };

  return Character;
};
