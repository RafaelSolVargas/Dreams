const { validationResult } = require('express-validator');
const { Phone } = require('../models');

module.exports = {
  deletePhone: async (req, res) => {
    /* Extrai o id no número a ser excluído */
    const { phoneId } = req.params;

    /* Validation  */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Exclui e finaliza */
    try {
      const deleted = await Phone.destroy({ where: { id: phoneId } });

      if (deleted) return res.status(200).json({ message: 'Phone deleted' });
      return res.status(500).json('There was an unknown error, the phone was not deleted');
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  updatePhone: async (req, res) => {
    const { phoneId } = req.params;
    const {
      ddi, ddd, number, type,
    } = req.body;

    /* Validation  */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Update */
    try {
      const updated = await Phone.update({
        ddi, ddd, number, type,
      }, {
        where: {
          id: phoneId,
        },
      });

      if (updated) return res.status(200).json({ message: 'Phone updated' });
      return res.status(500).json('There was an unknown error, the phone was not updated');
    } catch (erro) {
      return res.status(400).json({ erro });
    }
  },
  createPhone: async (req, res) => {
    const { userId } = res.locals;
    const {
      ddi, ddd, number, type,
    } = req.body;

    /* Validation  */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Update */
    try {
      const phone = await Phone.create(
        {
          userId, ddi, ddd, number, type,
        },
      );

      return res.status(200).json({ phone });
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  getPhone: async (req, res) => {
    const { phoneId } = req.params;

    try {
      const phone = await Phone.findByPk(phoneId);

      return res.status(200).json({ phone });
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  getUserPhones: async (req, res) => {
    // Busca todos os telefones de um User ou próprios
    const userId = req.params.userId || res.locals.userId;

    const phones = await Phone.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({ phones });
  },
};
