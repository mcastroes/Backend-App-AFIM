const router = require('express').Router();
const Paciente = require('../models/Paciente');

// GET todos
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET por id
router.get('/:id', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    if (!p) return res.status(404).json({ error: 'No encontrado' });
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST crear
router.post('/', async (req, res) => {
  try {
    const ultimo = await Paciente.findOne().sort({ id: -1 });
    const nuevoId = ultimo ? ultimo.id + 1 : 101;
    const p = new Paciente({ id: nuevoId, citas: [], notas: [],
      recomendaciones: [], resultadosPruebas: [], ...req.body });
    await p.save();
    res.status(201).json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT actualizar
router.put('/:id', async (req, res) => {
  try {
    const p = await Paciente.findOneAndUpdate(
      { id: Number(req.params.id) }, { $set: req.body }, { new: true }
    );
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Paciente.findOneAndDelete({ id: Number(req.params.id) });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST resultado prueba
router.post('/:id/resultados', async (req, res) => {
  try {
    const p = await Paciente.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $push: { resultadosPruebas: req.body } },
      { new: true }
    );
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST nota
router.post('/:id/notas', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    const maxId = p.notas.length ? Math.max(...p.notas.map(n => n.id)) : 0;
    p.notas.push({ id: maxId + 1, contenido: req.body.contenido });
    await p.save();
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET notas
router.get('/:id/notas', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    res.json(p?.notas || []);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT nota
router.put('/:id/notas/:notaId', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    const nota = p.notas.find(n => n.id === Number(req.params.notaId));
    if (nota) nota.contenido = req.body.contenido;
    await p.save();
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE nota
router.delete('/:id/notas/:notaId', async (req, res) => {
  try {
    await Paciente.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $pull: { notas: { id: Number(req.params.notaId) } } }
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST cita
router.post('/:id/citas', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    const maxId = p.citas.length ? Math.max(...p.citas.map(c => c.id)) : 0;
    p.citas.push({ id: maxId + 1, estado: 'pendiente', ...req.body });
    await p.save();
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET citas
router.get('/:id/citas', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    res.json(p?.citas || []);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT cita
router.put('/:id/citas/:citaId', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    const cita = p.citas.find(c => c.id === Number(req.params.citaId));
    if (cita) Object.assign(cita, req.body);
    await p.save();
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE cita
router.delete('/:id/citas/:citaId', async (req, res) => {
  try {
    await Paciente.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $pull: { citas: { id: Number(req.params.citaId) } } }
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET recomendaciones
router.get('/:id/recomendaciones', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    res.json(p?.recomendaciones || []);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST recomendacion
router.post('/:id/recomendaciones', async (req, res) => {
  try {
    const p = await Paciente.findOne({ id: Number(req.params.id) });
    const maxId = p.recomendaciones.length ? Math.max(...p.recomendaciones.map(r => r.id)) : 0;
    p.recomendaciones.push({ id: maxId + 1, ...req.body });
    await p.save();
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE recomendacion
router.delete('/:id/recomendaciones/:recId', async (req, res) => {
  try {
    await Paciente.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $pull: { recomendaciones: { id: Number(req.params.recId) } } }
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;