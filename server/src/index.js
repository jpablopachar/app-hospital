if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
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
app.use(express.static(path.join(__dirname, './public')));

/*                   Routes                      */
app.use('/api/users', require('./routes/user'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/all', require('./routes/search'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(app.get('port'), () => {
  console.log('Entorno: ', process.env.NODE_ENV);
  console.log(`Servidor en puerto ${app.get('port')}`);
});
