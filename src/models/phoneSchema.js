module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define(
    'Phone',
    {
      ddi: DataTypes.STRING,
      ddd: DataTypes.STRING,
      number: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Phone.associate = function associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'userPhone' });
  };

  return Phone;
};
