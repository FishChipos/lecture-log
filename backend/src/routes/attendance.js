const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.post('/checkin', attendanceController.checkin);

router.get('/session/:sessionId', attendanceController.getSessionAttendance);
router.get('/user/:userId/semester/:semester', attendanceController.getUserAttendance);

module.exports = router;