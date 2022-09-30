const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ succes: false, msg: 'Token not exists' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded.user;
    req.user.type = req.user.user_type;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, msg: 'token expired' });
    }
    return res.status(401).json({ success: false, msg: 'token invalid' });
  }
};
