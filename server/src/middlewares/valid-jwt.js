const jwt = require('jsonwebtoken');

const validJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'No existe token en la petición';
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token no válido',
    });
  }
};

module.exports = validJWT;
