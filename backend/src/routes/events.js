const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/:courseId', eventController.getEvents);
router.post('/', eventController.createEvent);

module.exports = router;