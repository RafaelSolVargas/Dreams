/* import database aqui */
const { validationResult } = require('express-validator');
const { User } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json(users);
  },
  getUser: async (req, res) => {
    // Serve para dois endPoints, user se buscam ou Adm buscando User
    const userId = req.params.userId || res.locals.userId;

    const user = await User.findByPk(userId, {
      include: [
        {
          association: 'userAddress',
          include: { association: 'countryAddress' },
        },
        { association: 'userPhone' },
        {
          association: 'userDream',
          include: { association: 'ddDream' },
        },
      ],
    });
    return res.status(200).json(user);
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    /* Exclui e finaliza */
    try {
      await User.destroy({ where: { id: userId } });
      return res.status(200).json({ message: 'User deleted' });
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  assignUser: async (req, res) => {
    const { userId } = req.params;
    const { roleId } = req.body;

    /* Validation  */
    const errors = validationResult(req, userId);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Update */
    try {
      await User.update(
        { roleId },
        {
          where: {
            id: userId,
          },
        },
      );

      return res.status(201).json({ message: 'User Role updated' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  },
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const {
      name,
      nickName,
      password,
      dateBirth,
      nationality,
      homepage,
      email,
      gender,
      race,
      maritalStatus,
      degreeInstruction,
    } = req.body;

    /* Validation  */
    const errors = validationResult(req, userId);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Update */
    try {
      await User.update(
        {
          name,
          nickName,
          password,
          dateBirth,
          nationality,
          homepage,
          email,
          gender,
          race,
          maritalStatus,
          degreeInstruction,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      return res.status(201).json({ message: 'User updated' });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  },
};
