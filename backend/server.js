const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '.env.production' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

app.use('/api/pacientes', require('./routes/pacientes'));

app.use(express.static(path.join(__dirname, '../dist/app-afim/browser')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/app-afim/browser/index.html'));
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor en puerto ${process.env.PORT || 3000}`)
);