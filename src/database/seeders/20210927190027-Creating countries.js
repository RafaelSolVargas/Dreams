const countries = [
  { name: 'Brazil', code: '55' },
  { name: 'England', code: '456' },
  { name: 'Germany', code: '12' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Country', countries, {});
  },

  down: async (queryInterface) => {
    await Promise.all(Object.values(countries).map((country) => {
      const response = queryInterface.bulkDelete('Country', { name: country.name }, {});

      return response;
    }));
  },
};
