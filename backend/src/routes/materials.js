const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), materialController.uploadMaterial);
router.get('/:course_id/:semester', materialController.getMaterialsByCourse);

module.exports = router;
