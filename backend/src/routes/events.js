const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/:courseId', eventController.getEvents);
router.get('/:courseId/history/:bucketId', eventController.getEventHistory);
router.post('/', eventController.createEvent);

module.exports = router;