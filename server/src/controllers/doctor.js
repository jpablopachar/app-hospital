const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find().populate('user', 'name img').populate('hospital', 'name img');

  res.json({
    ok: true,
    doctors,
  });
};

const createDoctor = async (req, res = response) => {
  const { uid } = req.uid;
  const doctor = new Doctor({
    user: uid,
    ...req.body,
  });

  try {
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

const updateDoctor = async (req, res = response) => {
  const { id } = req.params.id;
  const { uid } = req.uid;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: true,
        message: 'Médico no encontrado por le id',
      });
    }

    const changesDoctor = {
      ...req.body,
      user: uid,
    };

    const doctorUpdated = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true });

    res.json({
      ok: true,
      doctor: doctorUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador',
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const { id } = req.params.id;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: true,
        message: 'Médico no encontrado por id',
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.json({
      ok: true,
      message: 'Médico eliminado',
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
