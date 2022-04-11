const { Permission } = require('../../models');

module.exports = {
  canUpdateUsers: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Users',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteUsers: async (req, res, next) => {
    const { roleId, isOwner } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Users',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetAllUsers: async (req, res, next) => {
    const { isOwner, roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get All Users',
      },
    });

    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((!isOwner && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetUsers: async (req, res, next) => {
    const { isOwner, roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Users',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if ((isOwner === false && perms.all === false) || perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canGetHimself: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Get Himself',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canDeleteHimself: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Delete Himself',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canUpdateHimself: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Update Himself',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
  canAssignUser: async (req, res, next) => {
    const { roleId } = res.locals;

    const perms = await Permission.findOne({
      where:
      {
        roleId,
        task: 'Assign Users',
      },
    });
    if (perms === null) return res.status(500).json({ error: 'Permission not found' });
    if (perms.value === false) return res.status(401).json({ error: 'Access Denied' });
    return next();
  },
};
