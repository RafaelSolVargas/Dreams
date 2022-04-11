const { Permission } = require('../../models');

module.exports = {
  canCreateCountries: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Create Countries',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteCountries: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Countries',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdateCountries: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Countries',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetCountries: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Countries',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
