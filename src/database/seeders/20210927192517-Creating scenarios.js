const scenarios = [
  { title: 'My Work', kind: 'Nice' },
  { title: 'My House', kind: 'A lot of Problems' },
  { title: 'Shopping', kind: 'Gorgeous' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Scenario', scenarios, {});
  },

  down: async (queryInterface) => {
    await Promise.all(Object.values(scenarios).map((scenario) => {
      const response = queryInterface.bulkDelete('Scenario', { title: scenario.title }, {});

      return response;
    }));
  },
};
