const express = require('express');
const router = express.Router();
const multer = require('multer');
const assignmentController = require('../controllers/assignmentController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', assignmentController.createAssignment);
router.post('/grade', assignmentController.gradeAssignment);
router.post('/submit', upload.single('file'), assignmentController.submitAssignment);

router.get('/:courseId/semester/:semester', assignmentController.getAssignments);

module.exports = router;
