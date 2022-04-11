module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    'Country',
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  Country.associate = function associate(models) {
    this.hasMany(models.Address, { foreignKey: 'countryId', as: 'countryAddress' });
  };

  return Country;
};
