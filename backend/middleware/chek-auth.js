const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if(!token) {
      res.status(401).json({ message: 'You are not Authorization' });
    }

    const decodedToken = jwt.verify(token, 'supersecret');
    req.userId = decodedToken.userId;
    next();
  } catch(err) {
    res.status(401).json({ message: 'Token is not valid, authentication failed.' });
  }
}