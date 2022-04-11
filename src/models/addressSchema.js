module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      federativeUnit: DataTypes.STRING,
      city: DataTypes.STRING,
      cep: DataTypes.STRING,
      district: DataTypes.STRING,
      publicPlace: DataTypes.STRING,
      addressNumber: DataTypes.STRING,
      complement: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Address.associate = function associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'userAddress' });
    this.belongsTo(models.Country, { foreignKey: 'countryId', as: 'countryAddress' });
  };

  return Address;
};
