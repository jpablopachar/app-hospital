const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate('user', 'name img');

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const { uid } = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

const updateHospital = async (req, res = response) => {
  const { id } = req.params.id;
  const { uid } = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        message: 'Hospital no encontrado por id',
      });
    }

    const changesHospital = {
      ...req.body,
      user: uid,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true });

    res.json({
      ok: true,
      hospital: hospitalUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const { id } = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        message: 'Hospital no encontrado por id',
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      message: 'Hospital eliminado',
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
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
