const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Routes
router.post('/schedule-email', emailController.create);
router.get('/list-emails', emailController.readAll);
router.put('/reschedule-email/:id', emailController.update);
router.delete('/delete-email/:id', emailController.delete);

module.exports = router;
