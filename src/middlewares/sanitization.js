/* eslint-disable consistent-return */
/* eslint no-param-reassign: 0 */
async function breakObject(object) {
  await Promise.all(Object.keys(object).map(async (key) => {
    await Promise.all(Object.keys(object[key]).map(async (key2) => {
      if (typeof object[key][key2] === 'object') {
        object[key][key2] = await breakObject(object[key][key2]);
      }
      if (typeof object[key][key2] !== 'object') {
        object[key][key2] = String(object[key][key2]);

        let CorrectRes = true;

        const specialCharIndex = (object[key][key2].search(/[^A-zÁ-ù0-9.,\-_@#$%?^+*() ]/)); // Procura algo que não esteja nessa lista de chars válidos
        if (specialCharIndex !== -1 && CorrectRes) {
          CorrectRes = false;
          throw new Error(`Invalid character ${object[key][key2][specialCharIndex]}`);
        }

        object[key][key2] = object[key][key2].replace(/( )+/g, ' ').trim();
      }
    }));
  }));

  return object;
}

module.exports = {
  // Sanitização feita para rodar em todas as requisições
  sanitizeData: async (req, res, next) => {
    let hadError = false;

    await Promise.all(Object.keys(req.body).map(async (key) => {
      if (typeof req.body[key] === 'string') {
        let CorrectRes = true;

        const specialCharIndex = (req.body[key].search(/[^A-zÁ-ù0-9.,\-_@#$%?^+*() ]/)); // Procura algo que não esteja nessa lista de chars válidos
        if (specialCharIndex !== -1 && CorrectRes) {
          CorrectRes = false;
          throw new Error(`Invalid character ${req.body[key][specialCharIndex]}`);
        }

        req.body[key] = req.body[key].replace(/( )+/g, ' ').trim();
      } else if (typeof req.body[key] === 'object') {
        try {
          req.body[key] = await breakObject(req.body[key]);
        } catch (erro) {
          hadError = true;
          return res.status(400).json({ error: erro.message });
        }
      }
    }));

    if (!hadError) next();
  },
};
