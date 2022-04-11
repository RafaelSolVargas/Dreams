/* eslint object-curly-newline: 0 */
const permissions = [
  // ---------------------------- USERS -------------------------------
  /* Address */
  { roleId: 3, task: 'Create Addresses', all: false, value: true },
  { roleId: 3, task: 'Delete Addresses', all: false, value: true },
  { roleId: 3, task: 'Update Addresses', all: false, value: true },
  { roleId: 3, task: 'Get Addresses', all: false, value: true },
  /* Phone */
  { roleId: 3, task: 'Create Phones', all: false, value: true },
  { roleId: 3, task: 'Delete Phones', all: false, value: true },
  { roleId: 3, task: 'Update Phones', all: false, value: true },
  { roleId: 3, task: 'Get Phones', all: false, value: true },
  /* Dreams */
  { roleId: 3, task: 'Create Dreams', all: false, value: true },
  { roleId: 3, task: 'Delete Dreams', all: false, value: true },
  { roleId: 3, task: 'Update Dreams', all: false, value: true },
  { roleId: 3, task: 'Get Dreams', all: false, value: true },
  /* Characters */
  { roleId: 3, task: 'Create Characters', all: false, value: true },
  { roleId: 3, task: 'Delete Characters', all: false, value: true },
  { roleId: 3, task: 'Update Characters', all: false, value: true },
  { roleId: 3, task: 'Get Characters', all: false, value: true },
  /* Emotions */
  { roleId: 3, task: 'Create Emotions', all: false, value: false },
  { roleId: 3, task: 'Delete Emotions', all: false, value: false },
  { roleId: 3, task: 'Update Emotions', all: false, value: false },
  { roleId: 3, task: 'Get Emotions', all: false, value: false },
  /* Scenarios */
  { roleId: 3, task: 'Create Scenarios', all: false, value: false },
  { roleId: 3, task: 'Delete Scenarios', all: false, value: false },
  { roleId: 3, task: 'Update Scenarios', all: false, value: false },
  { roleId: 3, task: 'Get Scenarios', all: false, value: false },
  /* Countries */
  { roleId: 3, task: 'Create Countries', all: false, value: false },
  { roleId: 3, task: 'Delete Countries', all: false, value: false },
  { roleId: 3, task: 'Update Countries', all: false, value: false },
  { roleId: 3, task: 'Get Countries', all: false, value: false },
  /* Users */
  { roleId: 3, task: 'Assign Users', all: false, value: false },
  { roleId: 3, task: 'Get Users', all: false, value: true },
  { roleId: 3, task: 'Get All Users', all: false, value: false },
  { roleId: 3, task: 'Delete Users', all: false, value: true },
  { roleId: 3, task: 'Update Users', all: false, value: true },
  { roleId: 3, task: 'Get Himself', all: false, value: true },
  { roleId: 3, task: 'Update Himself', all: false, value: true },
  { roleId: 3, task: 'Delete Himself', all: false, value: true },

  // ---------------------------- ADMINS -------------------------------
  /* Address */
  { roleId: 2, task: 'Create Addresses', all: false, value: true },
  { roleId: 2, task: 'Delete Addresses', all: true, value: true },
  { roleId: 2, task: 'Update Addresses', all: false, value: true },
  { roleId: 2, task: 'Get Addresses', all: true, value: true },
  /* Phone */
  { roleId: 2, task: 'Create Phones', all: false, value: true },
  { roleId: 2, task: 'Delete Phones', all: true, value: true },
  { roleId: 2, task: 'Update Phones', all: false, value: true },
  { roleId: 2, task: 'Get Phones', all: true, value: true },
  /* Dreams */
  { roleId: 2, task: 'Create Dreams', all: false, value: true },
  { roleId: 2, task: 'Delete Dreams', all: true, value: true },
  { roleId: 2, task: 'Update Dreams', all: false, value: true },
  { roleId: 2, task: 'Get Dreams', all: true, value: true },
  /* Characters */
  { roleId: 2, task: 'Create Characters', all: false, value: true },
  { roleId: 2, task: 'Delete Characters', all: true, value: true },
  { roleId: 2, task: 'Update Characters', all: false, value: true },
  { roleId: 2, task: 'Get Characters', all: true, value: true },
  /* Emotions */
  { roleId: 2, task: 'Create Emotions', all: true, value: true },
  { roleId: 2, task: 'Delete Emotions', all: true, value: true },
  { roleId: 2, task: 'Update Emotions', all: false, value: false },
  { roleId: 2, task: 'Get Emotions', all: true, value: true },
  /* Scenarios */
  { roleId: 2, task: 'Create Scenarios', all: true, value: true },
  { roleId: 2, task: 'Delete Scenarios', all: true, value: true },
  { roleId: 2, task: 'Update Scenarios', all: false, value: false },
  { roleId: 2, task: 'Get Scenarios', all: true, value: true },
  /* Countries */
  { roleId: 2, task: 'Create Countries', all: false, value: true },
  { roleId: 2, task: 'Delete Countries', all: false, value: true },
  { roleId: 2, task: 'Update Countries', all: false, value: false },
  { roleId: 2, task: 'Get Countries', all: false, value: true },
  /* Users */
  { roleId: 2, task: 'Assign Users', all: false, value: false },
  { roleId: 2, task: 'Get Users', all: true, value: true },
  { roleId: 2, task: 'Get All Users', all: true, value: true },
  { roleId: 2, task: 'Delete Users', all: true, value: true },
  { roleId: 2, task: 'Update Users', all: true, value: true },
  { roleId: 2, task: 'Get Himself', all: false, value: true },
  { roleId: 2, task: 'Update Himself', all: false, value: true },
  { roleId: 2, task: 'Delete Himself', all: false, value: true },

  // ---------------------------- SUPER ADMINS -------------------------------
  /* Address */
  { roleId: 1, task: 'Create Addresses', all: false, value: true },
  { roleId: 1, task: 'Delete Addresses', all: true, value: true },
  { roleId: 1, task: 'Update Addresses', all: false, value: true },
  { roleId: 1, task: 'Get Addresses', all: true, value: true },
  /* Phone */
  { roleId: 1, task: 'Create Phones', all: false, value: true },
  { roleId: 1, task: 'Delete Phones', all: true, value: true },
  { roleId: 1, task: 'Update Phones', all: false, value: true },
  { roleId: 1, task: 'Get Phones', all: true, value: true },
  /* Dreams */
  { roleId: 1, task: 'Create Dreams', all: false, value: true },
  { roleId: 1, task: 'Delete Dreams', all: true, value: true },
  { roleId: 1, task: 'Update Dreams', all: false, value: true },
  { roleId: 1, task: 'Get Dreams', all: true, value: true },
  /* Characters */
  { roleId: 1, task: 'Create Characters', all: false, value: true },
  { roleId: 1, task: 'Delete Characters', all: true, value: true },
  { roleId: 1, task: 'Update Characters', all: false, value: true },
  { roleId: 1, task: 'Get Characters', all: true, value: true },
  /* Emotions */
  { roleId: 1, task: 'Create Emotions', all: true, value: true },
  { roleId: 1, task: 'Delete Emotions', all: true, value: true },
  { roleId: 1, task: 'Update Emotions', all: false, value: false },
  { roleId: 1, task: 'Get Emotions', all: true, value: true },
  /* Scenarios */
  { roleId: 1, task: 'Create Scenarios', all: true, value: true },
  { roleId: 1, task: 'Delete Scenarios', all: true, value: true },
  { roleId: 1, task: 'Update Scenarios', all: false, value: false },
  { roleId: 1, task: 'Get Scenarios', all: true, value: true },
  /* Countries */
  { roleId: 1, task: 'Create Countries', all: false, value: true },
  { roleId: 1, task: 'Delete Countries', all: false, value: true },
  { roleId: 1, task: 'Update Countries', all: false, value: false },
  { roleId: 1, task: 'Get Countries', all: false, value: true },
  /* Users */
  { roleId: 1, task: 'Assign Users', all: true, value: true },
  { roleId: 1, task: 'Get Users', all: true, value: true },
  { roleId: 1, task: 'Get All Users', all: true, value: true },
  { roleId: 1, task: 'Delete Users', all: true, value: true },
  { roleId: 1, task: 'Update Users', all: true, value: true },
  { roleId: 1, task: 'Get Himself', all: false, value: true },
  { roleId: 1, task: 'Update Himself', all: false, value: true },
  { roleId: 1, task: 'Delete Himself', all: false, value: true },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Permission', permissions, {});
  },

  down: async (queryInterface) => {
    await Promise.all(Object.values(permissions).map((permission) => {
      const response = queryInterface.bulkDelete('Permission', {
        roleId: permission.roleId,
        task: permission.task,
        all: permission.all,
        value: permission.value,
      }, {});

      return response;
    }));
  },
};
