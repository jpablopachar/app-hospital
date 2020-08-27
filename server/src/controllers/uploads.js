const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response) => {
  const { type } = req.params.type;
  const { id } = req.params.id;
  const validTypes = ['hospitals', 'doctors', 'users'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      message: 'No es un médico, usuario u hospital (tipo)',
    });
  }

  const file = req.files.image;
  const shortName = file.name.split('.');
  const fileExtension = shortName[shortName.length - 1];
  const validsExtensions = ['pgg', 'jpg', 'jpeg', 'gif'];

  if (!validsExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      message: 'No es una extensión permitida',
    });
  }

  const filename = `${uuidv4()}.${fileExtension}`;
  const path = `./uploads/${type}/${filename}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: 'Error al mover la imágen',
      });
    }

    updateImage(type, id, filename);

    res.json({
      ok: true,
      message: 'Archivo subido',
      filename,
    });
  });
};

const returnImage = (req, res = response) => {
  const { type } = req.params.type;
  const { photo } = req.params.photo;
  const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    // eslint-disable-next-line no-shadow
    const pathImg = path.join(__dirname, '../uploads/no-img.png');

    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  returnImage,
};
