const Token = require('../models/Token');

const authenticator = async (req, res, next) => {
  try {
    const userToken = req.headers['authorization'];

    if (userToken == 'null') {
      throw new Error('User not authenticated.');
    } else {
      const validToken = await Token.getOneByToken(userToken);
      next();
    }
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
};

module.exports = authenticator;
