const emotions = [
  { title: 'Love' },
  { title: 'Sadness' },
  { title: 'Fear' },
  { title: 'Anger' },
  { title: 'Disgust' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Emotion', emotions, {});
  },

  down: async (queryInterface) => {
    await Promise.all(Object.values(emotions).map((emotion) => {
      const response = queryInterface.bulkDelete('Emotion', { title: emotion.title }, {});

      return response;
    }));
  },
};
