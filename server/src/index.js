if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

require('./database/db');

const app = express();

/*                  Settings                     */
app.set('port', process.env.PORT || 3000);

/*                 Middleware                   */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/*                  Static Files                */
// app.use('/images', express.static(path.join(__dirname, './public')));

/*                   Routes                      */
// app.use('/api/usuario', require('../routes/UsuarioRoute'));
// app.use('/api/publicaciones', require('../routes/PublicacionRoute'));

app.listen(app.get('port'), () => {
  console.log('Entorno: ', process.env.NODE_ENV);
  console.log(`Servidor en puerto ${app.get('port')}`);
});
