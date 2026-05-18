const assignmentRepo = require('../repositories/assignmentRepo');
const cloudinary = require('../config/cloudinary');

const createAssignment = async (req, res) => {
  try {
    const { course_id, semester, title, description, deadline, max_score } = req.body;
    const created_by = req.user ? req.user.id : req.body.created_by;

    if (!course_id || !semester || !title || !deadline || !created_by) {
      return res.status(400).json({ error: 'Data assignment tidak lengkap' });
    }

    const assignment = await assignmentRepo.createAssignment({
      course_id, semester, title, description, 
      deadline: new Date(deadline), 
      max_score: max_score || 100, 
      created_by
    });

    res.status(201).json({ message: 'Assignment berhasil dibuat', data: assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const { courseId, semester } = req.params;
    const records = await assignmentRepo.getAssignmentsByCourse(courseId, semester);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file tugas yang diunggah' });
    }

    const { assignment_id, course_id, semester, title } = req.body;
    const student_id = req.user ? req.user.id : req.body.student_id;

    if (!assignment_id || !course_id || !semester || !student_id || !title) {
      return res.status(400).json({ error: 'Data submission tidak lengkap' });
    }

    const assignmentDetails = await assignmentRepo.getAssignmentDetails(course_id, semester, assignment_id);
    if (!assignmentDetails) {
      return res.status(404).json({ error: 'Assignment tidak ditemukan' });
    }

    const now = new Date();
    const isLate = now > new Date(assignmentDetails.deadline);
    const status = isLate ? 'late' : 'submitted';

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'lectureLog/submissions', resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Gagal mengunggah file ke Cloudinary' });
        }

        try {
          const submission = await assignmentRepo.submitAssignment({
            assignment_id,
            student_id,
            course_id,
            semester,
            title: assignmentDetails.title,
            file_url: result.secure_url,
            file_name: req.file.originalname,
            status
          });
          
          res.status(201).json({ 
            message: 'Tugas berhasil dikumpulkan (Dual-Write OK)', 
            data: submission 
          });
        } catch (dbError) {
          console.error('Error saving submission:', dbError);
          res.status(500).json({ error: 'Gagal menyimpan data submission ke database' });
        }
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const gradeAssignment = async (req, res) => {
  try {
    const { assignment_id, student_id, course_id, semester, score, feedback } = req.body;
    const graded_by = req.user ? req.user.id : req.body.graded_by;

    if (!assignment_id || !student_id || !course_id || !semester || score === undefined || !graded_by) {
      return res.status(400).json({ error: 'Data penilaian tidak lengkap' });
    }

    await assignmentRepo.gradeAssignment({
      assignment_id, student_id, course_id, semester, score, feedback, graded_by
    });

    res.status(200).json({ message: 'Penilaian berhasil disimpan (Dual-Write OK)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  submitAssignment,
  gradeAssignment
};
