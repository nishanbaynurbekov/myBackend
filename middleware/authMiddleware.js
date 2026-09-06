const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Header'де токен бар экенин текшерүү
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer TOKEN_STRING" ичинен токенди ажыратып алуу
      token = req.headers.authorization.split(' ')[1];

      // Токенди текшерүү
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Токендеги ID менен ролду сурамга кошуу
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Авторизация катасы: токен туура эмес же мөөнөтү бүткөн' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Токен табылган жок, кирүүгө уруксат берилбейт' });
  }
};

module.exports = { protect };