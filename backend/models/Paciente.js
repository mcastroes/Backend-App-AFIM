const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  id: Number, dia: Number, mes: Number, anio: Number, fecha: String, hora: String,
  motivo: String, estado: { type: String, default: 'pendiente' }
});

const NotaSchema = new mongoose.Schema({
  id: Number, contenido: String
});

const RecomendacionSchema = new mongoose.Schema({
  id: Number, titulo: String, contenido: String
});

const RespuestaSchema = new mongoose.Schema({
  idPregunta: String, valor: mongoose.Schema.Types.Mixed
});

const ResultadoPruebaSchema = new mongoose.Schema({
  fechaFinalizacion: String,
  respuestas: [RespuestaSchema]
});

const PacienteSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  nombre: String,
  apellidos: String,
  riesgo: String,
  discapacidad: String,
  en_seguimiento: Boolean,
  citas: [CitaSchema],
  notas: [NotaSchema],
  recomendaciones: [RecomendacionSchema],
  resultadosPruebas: [ResultadoPruebaSchema]
});

module.exports = mongoose.model('Paciente', PacienteSchema);