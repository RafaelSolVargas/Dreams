/* import database aqui */
const { validationResult } = require('express-validator');
const { Address } = require('../models');

module.exports = {
  deleteAddresses: async (req, res) => {
    /* Extrai o id do endereço a ser excluído */
    const { addressId } = req.params;

    /* Exclui e finaliza */
    try {
      const deleted = await Address.destroy({ where: { id: addressId } });
      if (deleted) return res.status(200).json({ message: 'Address deleted' });
      return res.status(500).json('There was an unknown error, the address was not deleted');
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  updateAddresses: async (req, res) => {
    /* Extrai o id do endereço a ser atualizado */
    const { addressId } = req.params;

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

    /* Validation  */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Update */
    try {
      const updated = await Address.update({
        countryId,
        federativeUnit,
        city,
        cep,
        district,
        publicPlace,
        addressNumber,
        complement,
      }, {
        where: {
          id: addressId,
        },
      });
      if (updated) return res.status(201).json({ message: 'Address updated' });
      return res.status(500).json('There was an unknown error, the address was not updated');
    } catch (erro) {
      return res.status(400).json({ error: erro.message });
    }
  },
  createAddresses: async (req, res) => {
    const { userId } = res.locals;
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

    /* Validation s */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    /* Create Address */
    try {
      // Usa a instância usuário para criar o endereço, garantindo que estarão ligados
      const address = await Address.create({
        userId,
        countryId,
        federativeUnit,
        city,
        cep,
        district,
        publicPlace,
        addressNumber,
        complement,
      });

      return res.status(201).json({ address });
    } catch (erro) {
      return res.status(400).json({ error: erro.message });
    }
  },
  getAddresses: async (req, res) => {
    const { addressId } = req.params;

    try {
      const address = await Address.findByPk(addressId);

      return res.status(200).json({ address });
    } catch (erro) {
      return res.status(400).json({ errors: erro });
    }
  },
  getUserAddresses: async (req, res) => {
    // Para o Admin pesquisar ou caso o User buscar
    const userId = req.params.userId || res.locals.userId;

    const dreams = await Address.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json({ dreams });
  },
};
