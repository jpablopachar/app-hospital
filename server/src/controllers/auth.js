const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'Email no encontrado',
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Contraseña no válida',
      });
    }

    const token = await generarJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const userDB = await User.findOne({ email });

    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();

    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Token no es correcto',
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req.uid;
  const token = await generarJWT(uid);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
