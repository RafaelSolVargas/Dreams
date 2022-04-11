module.exports = (sequelize, DataTypes) => {
  const Emotion = sequelize.define(
    'Emotion',
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Emotion.associate = function associate(models) {
    this.hasMany(models.DreamDetail, { foreignKey: 'emotionId', as: 'ddEmotion' });
    this.hasMany(models.Character, { foreignKey: 'characterEmotionId', as: 'characterEmotion' });
    this.hasMany(models.Character, { foreignKey: 'userEmotionId', as: 'userEmotion' });
  };

  return Emotion;
};
