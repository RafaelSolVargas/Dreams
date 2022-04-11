/* import database aqui */
const { validationResult } = require('express-validator');
const { User, sequelize } = require('../models');

module.exports = {
  createUser: async (req, res) => {
    const {
      countryId,
      federativeUnit,
      city,
      cep,
      district,
      publicPlace,
      addressNumber,
      complement,
    } = req.body;
    const {
      ddi, ddd, number, type,
    } = req.body;
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ ValidationErrors: errors.array() });

    /* Creating the Transaction */
    const creatingUserT = await sequelize.transaction();

    /* User creating */
    try {
      const user = await User.create(
        {
          name,
          roleId: 3,
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
        }, { transaction: creatingUserT },
      );

      const address = await user.createUserAddress(
        {
          countryId,
          federativeUnit,
          city,
          cep,
          district,
          publicPlace,
          addressNumber,
          complement,
        }, { transaction: creatingUserT },
      );

      const phone = await user.createUserPhone(
        {
          ddi, ddd, number, type,
        }, { transaction: creatingUserT },
      );

      await creatingUserT.commit();
      return res.status(201).json({ user, address, phone });
    } catch (erro) {
      await creatingUserT.rollback();
      return res.status(500).json({ UncaughtError: erro.message });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    /* Validation  */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({ errors: errors.array() });

    const user = await User.findOne({ where: { email } });

    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    user.dataValues.token = user.generateToken();
    return res.status(200).json({ user });
  },
};
