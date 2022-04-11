module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    'Permission',
    {
      roleId: DataTypes.INTEGER,
      task: DataTypes.STRING,
      all: DataTypes.BOOLEAN,
      value: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    },
  );

  // Função que irá criar o relacionamento entre as tabelas
  Permission.associate = function associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'permissionRole' });
  };

  return Permission;
};
