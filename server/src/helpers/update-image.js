const User = require('../models/user');
// eslint-disable-next-line import/order
const fs = require('fs');

const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (typeFile, id, filename) => {
  let oldPath = '';

  // eslint-disable-next-line default-case
  switch (typeFile) {
    case 'doctors':
      // eslint-disable-next-line no-case-declarations
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        console.log('No es un médico por id');

        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;

      deleteImage(filename);

      await doctor.save();

      return true;

      // eslint-disable-next-line no-unreachable
      break;
    case 'hospitals':
      // eslint-disable-next-line no-case-declarations
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        console.log('No es un hospital por id');

        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;

      deleteImage(oldPath);

      hospital.img = filename;

      await hospital.save();

      return true;

      // eslint-disable-next-line no-unreachable
      break;
    case 'users':
      // eslint-disable-next-line no-case-declarations
      const user = await User.findById(id);

      if (!user) {
        console.log('No es un usuario por id');

        return false;
      }

      oldPath = `./uploads/hospitals/${user.img}`;

      deleteImage(oldPath);

      user.img = filename;

      await user.save();

      return true;

      // eslint-disable-next-line no-unreachable
      break;
  }
};

module.exports = updateImage;
