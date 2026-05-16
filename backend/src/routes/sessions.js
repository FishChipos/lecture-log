const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.createSession);
router.get('/:course_id/:semester', sessionController.getSessionsByCourse);

module.exports = router;
