const express = require('express');
const router = express.Router();
const client = require('../config/cassandra');

router.post('/classes/:classId/checkin', async (req, res) => {
  try {
    const classId = req.params.classId;
    const { session_id, user_id, course_id, semester, status, note } = req.body;
    const checkedInAt = new Date();

    const queries = [
      {
        query: `INSERT INTO attendance_by_session (session_id, user_id, status, checked_in_at, note) 
                VALUES (?, ?, ?, ?, ?)`,
        params: [session_id, user_id, status, checkedInAt, note || null]
      },
      {
        query: `INSERT INTO attendance_by_user (user_id, semester, session_id, course_id, status, checked_in_at) 
                VALUES (?, ?, ?, ?, ?, ?)`,
        params: [user_id, semester, session_id, course_id, status, checkedInAt]
      }
    ];

    await client.batch(queries, { prepare: true });

    res.status(201).json({ message: 'Presensi berhasil dicatat di kedua tabel.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;