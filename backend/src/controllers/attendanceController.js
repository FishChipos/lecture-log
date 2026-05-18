const attendanceRepo = require('../repositories/attendanceRepo');

const checkin = async (req, res) => {
  try {
    const { session_id, course_id, semester, status, note } = req.body;
    
    const user_id = req.user ? req.user.id : req.body.user_id;

    if (!session_id || !course_id || !semester || !status || !user_id) {
      return res.status(400).json({ error: 'Data absensi tidak lengkap' });
    }

    const checked_in_at = new Date();

    await attendanceRepo.submitAttendance({
      session_id,
      user_id,
      course_id,
      semester,
      status,
      checked_in_at,
      note
    });

    res.status(201).json({ message: 'Presensi berhasil dicatat (Dual-Write OK)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const records = await attendanceRepo.getAttendanceBySession(sessionId);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserAttendance = async (req, res) => {
  try {
    const { userId, semester } = req.params;
    const records = await attendanceRepo.getAttendanceByUser(userId, semester);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  checkin,
  getSessionAttendance,
  getUserAttendance
};
