module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Role.associate = function associate(models) {
    this.hasMany(models.Permission, { foreignKey: 'roleId', as: 'permissionRole' });
  };

  return Role;
};
