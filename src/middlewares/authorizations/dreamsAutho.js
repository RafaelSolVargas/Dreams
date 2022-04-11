const { Permission } = require('../../models');

module.exports = {
  canCreateDreams: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Create Dreams',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteDreams: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Dreams',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdateDreams: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Dreams',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetDreams: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Dreams',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
