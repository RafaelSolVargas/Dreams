const { Permission } = require('../../models');

module.exports = {
  canCreateAddresses: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Create Addresses',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteAddresses: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Addresses',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdateAddresses: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Addresses',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetAddresses: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Addresses',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
