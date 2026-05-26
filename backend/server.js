const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '.env.production' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

app.use('/api/pacientes', require('./routes/pacientes'));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor en puerto ${process.env.PORT || 3000}`)
);