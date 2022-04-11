const { check } = require('express-validator');
const { Role } = require('../../models');

module.exports = {
  assignUserValidation: [
    check('roleId')
      .notEmpty()
      .withMessage('Role Id cannot be Empty')
      .custom(async (value) => {
        const role = await Role.findByPk(value);

        if (role === null) throw new Error('Role not Found');
        if (role.name === 'SuperAdmin') throw new Error('You cannot set another Super Admin');
      }),
  ],
};
