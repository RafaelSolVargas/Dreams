const { sequelize } = require('../../src/models');

module.exports = async () => {
  const response = Promise.all(Object.keys(sequelize.models).map((key) => {
    const responseInner = sequelize.models[key].destroy({ truncate: { cascade: true } });

    return responseInner;
  }));

  return response;
};
