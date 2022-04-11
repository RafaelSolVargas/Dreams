const {
  Phone, Address, Character, Dream, DreamDetail, User,
} = require('../models');

module.exports = {
  isPhoneOwner: async (req, res, next) => {
    const { phoneId } = req.params;
    const { userId } = res.locals;

    if (!Number.isInteger(Number(phoneId))) { return res.status(400).json({ error: 'Phone Id must be Integer' }); }
    const phone = await Phone.findByPk(phoneId);

    if (phone === null) return res.status(401).json({ error: 'Phone not found' });

    res.locals.isOwner = phone.userId === userId;
    return next();
  },
  isAddressOwner: async (req, res, next) => {
    const { addressId } = req.params;
    const { userId } = res.locals;

    if (!Number.isInteger(Number(addressId))) { return res.status(400).json({ error: 'Address Id must be Integer' }); }
    const address = await Address.findByPk(addressId);

    /* Caso Address não exista */
    if (address === null) return res.status(401).json({ error: 'Address not Found' });

    res.locals.isOwner = address.userId === userId;
    return next();
  },
  isDreamOwner: async (req, res, next) => {
    const { dreamId } = req.params;
    const { userId } = res.locals;

    if (!Number.isInteger(Number(dreamId))) { return res.status(400).json({ error: 'Dream Id must be Integer' }); }
    const dream = await Dream.findByPk(dreamId);

    /* Caso dream não exista */
    if (dream === null) return res.status(401).json({ error: 'Dream not Found' });

    res.locals.isOwner = dream.userId === userId;
    return next();
  },
  isCharacterOwner: async (req, res, next) => {
    const { characterId } = req.params;
    const { userId } = res.locals;

    if (!Number.isInteger(Number(characterId))) { return res.status(400).json({ error: 'Character Id must be Integer' }); }
    const character = await Character.findByPk(characterId,
      {
        include: {
          association: 'ddCharacter',
          include: { association: 'ddDream' },
        },
      });

    /* Caso character não exista */
    if (character === null) return res.status(401).json({ error: 'Character not Found' });

    res.locals.isOwner = character.ddCharacter.ddDream.userId === userId;
    return next();
  },
  isDreamDetailOwner: async (req, res, next) => {
    const { dreamDetailId } = req.params;
    const { userId } = res.locals;

    if (!Number.isInteger(Number(dreamDetailId))) { return res.status(400).json({ error: 'Dream Detail Id must be Integer' }); }
    const dreamDetail = await DreamDetail.findByPk(dreamDetailId,
      {
        include: {
          association: 'ddDream',
        },
      });

    /* Caso Dream Detail não exista */
    if (dreamDetail === null) return res.status(401).json({ error: 'Dream Detail not Found' });

    res.locals.isOwner = dreamDetail.ddDream.userId === userId;
    return next();
  },
  isUserOwner: async (req, res, next) => {
    const { userId } = req.params;
    const thisUserId = res.locals.userId;

    if (!Number.isInteger(Number(userId))) return res.status(400).json({ error: 'User Id must be Integer' });
    const user = await User.findByPk(userId);

    /* Caso User não exista */
    if (user === null) return res.status(401).json({ error: 'User not Found' });

    res.locals.isOwner = user.id === thisUserId;
    return next();
  },
};
