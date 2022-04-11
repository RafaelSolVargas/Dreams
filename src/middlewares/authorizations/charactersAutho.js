const { Permission } = require('../../models');

module.exports = {
  canCreateCharacters: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Create Characters',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteCharacters: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Characters',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdateCharacters: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Characters',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetCharacters: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Characters',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
