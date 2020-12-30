const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLog = await LogEntry.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
    );
    res.json(updatedLog);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLog = await LogEntry.deleteOne({ _id: id });
    res.json(deletedLog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
