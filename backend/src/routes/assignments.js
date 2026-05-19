const express = require('express');
const router = express.Router();
const multer = require('multer');
const assignmentController = require('../controllers/assignmentController');

const { requireAuth } = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', assignmentController.createAssignment);
router.post('/grade', assignmentController.gradeAssignment);
router.post('/submit', requireAuth, upload.single('file'), assignmentController.submitAssignment);

router.get('/:courseId/semester/:semester', assignmentController.getAssignments);
router.get('/:assignmentId/submissions', assignmentController.getSubmissionsByAssignment);
router.get('/student/:studentId/semester/:semester', assignmentController.getSubmissionsByStudent);

module.exports = router;
