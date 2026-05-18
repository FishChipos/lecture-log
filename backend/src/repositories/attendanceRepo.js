const client = require('../config/cassandra');

const submitAttendance = async ({ session_id, user_id, course_id, semester, status, checked_in_at, note }) => {
  const queries = [
    {
      query: `INSERT INTO attendance_by_session (session_id, user_id, status, checked_in_at, note) 
              VALUES (?, ?, ?, ?, ?)`,
      params: [session_id, user_id, status, checked_in_at, note || null]
    },
    {
      query: `INSERT INTO attendance_by_user (user_id, semester, session_id, course_id, status, checked_in_at) 
              VALUES (?, ?, ?, ?, ?, ?)`,
      params: [user_id, semester, session_id, course_id, status, checked_in_at]
    }
  ];

  await client.batch(queries, { prepare: true });
};

const getAttendanceBySession = async (session_id) => {
  const query = `SELECT * FROM attendance_by_session WHERE session_id = ?`;
  const result = await client.execute(query, [session_id], { prepare: true });
  return result.rows;
};

const getAttendanceByUser = async (user_id, semester) => {
  const query = `SELECT * FROM attendance_by_user WHERE user_id = ? AND semester = ?`;
  const result = await client.execute(query, [user_id, semester], { prepare: true });
  return result.rows;
};

module.exports = {
  submitAttendance,
  getAttendanceBySession,
  getAttendanceByUser
};
