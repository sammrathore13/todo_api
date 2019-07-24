const express = require('express');
const taskRoutes = require('./task.route');

const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));
/**
 * GET v1/docs
 */
//router.use('/docs', express.static('docs'));
router.use('/tasks', taskRoutes);
module.exports = router;
