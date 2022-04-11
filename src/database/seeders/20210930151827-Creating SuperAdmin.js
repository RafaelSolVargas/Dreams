const bcrypt = require('bcryptjs');

const password = bcrypt.hashSync('RafaelVargas1@', bcrypt.genSaltSync(10));

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('User', [{
      id: 1,
      name: 'Rafael Sol Vargas',
      nickName: 'SuperAdmin',
      dateBirth: '2000-11-28',
      dateRegistration: new Date(),
      email: 'rafael@gmail.com',
      password,
      roleId: 1,
      nationality: 'brazilian',
      gender: 'male',
      race: 'white',
      maritalStatus: 'married',
      degreeInstruction: 'master',
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('User', { id: 1 }, {});
  },
};
