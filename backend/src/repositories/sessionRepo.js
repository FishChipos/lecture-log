const client = require('../config/cassandra');
const { types } = require('cassandra-driver');

const createSession = async (session) => {
  const query = 'INSERT INTO sessions (course_id, semester, session_id, lecturer_id, room, started_at, topic) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [
    session.course_id,
    session.semester,
    types.TimeUuid.now(),
    session.lecturer_id,
    session.room,
    session.started_at,
    session.topic
  ];
  await client.execute(query, params, { prepare: true });
  return { session_id: params[2], ...session };
};

const getSessionsByCourse = async (course_id, semester) => {
  const query = 'SELECT * FROM sessions WHERE course_id = ? AND semester = ?';
  const result = await client.execute(query, [course_id, semester], { prepare: true });
  return result.rows;
};

module.exports = {
  createSession,
  getSessionsByCourse
};
