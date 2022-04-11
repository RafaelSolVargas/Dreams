const { Permission } = require('../../models');

module.exports = {
  canCreatePhones: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Create Phones',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeletePhones: async (req, res, next) => {
    const { isOwner, roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Phones',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdatePhones: async (req, res, next) => {
    const { isOwner, roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Phones',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetPhones: async (req, res, next) => {
    const { isOwner, roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Phones',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
