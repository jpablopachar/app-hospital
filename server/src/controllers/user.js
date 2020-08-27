const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find({}, 'name email, role, google img').skip(from).limit(5), User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const createUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: 'El correo ya está registrado'
      });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error inesperado... revisar logs',
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'No existe un usuario con ese id'
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          ok: false,
          message: 'Ya existe un usuario con ese email'
        });
      }
    }

    fields.email = email;

    const userUpdate = await User.findByIdAndUpdate(uid, fields, { new: true });

    res.json({
      ok: true,
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error inesperado',
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'No existe un usuario con ese id',
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      message: 'Usuario eliminado'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
