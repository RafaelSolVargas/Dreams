const roles = [
  { id: 1, name: 'SuperAdmin' },
  { id: 2, name: 'Admin' },
  { id: 3, name: 'User' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Role', roles, {});
  },

  down: async (queryInterface) => {
    await Promise.all(Object.values(roles).map((role) => {
      const response = queryInterface.bulkDelete('Role', { name: role.name }, {});

      return response;
    }));
  },
};
