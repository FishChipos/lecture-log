const client = require('../config/cassandra');
const { types } = require('cassandra-driver');
const TimeUuid = types.TimeUuid;

const createAssignment = async ({ course_id, semester, title, description, deadline, max_score, created_by }) => {
  const assignment_id = TimeUuid.now();
  const query = `
    INSERT INTO assignments_by_course 
    (course_id, semester, assignment_id, title, description, deadline, max_score, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [course_id, semester, assignment_id, title, description, deadline, max_score, created_by];
  
  await client.execute(query, params, { prepare: true });
  return { assignment_id, course_id, semester, title };
};

const getAssignmentsByCourse = async (course_id, semester) => {
  const query = `SELECT * FROM assignments_by_course WHERE course_id = ? AND semester = ?`;
  const result = await client.execute(query, [course_id, semester], { prepare: true });
  return result.rows;
};

const getAssignmentDetails = async (course_id, semester, assignment_id) => {
  const query = `SELECT * FROM assignments_by_course WHERE course_id = ? AND semester = ? AND assignment_id = ?`;
  const result = await client.execute(query, [course_id, semester, assignment_id], { prepare: true });
  return result.rows[0];
};

const submitAssignment = async ({ assignment_id, student_id, course_id, semester, title, file_url, file_name, status }) => {
  const submitted_at = new Date();
  const queries = [
    {
      query: `INSERT INTO submissions_by_assignment 
              (assignment_id, student_id, submitted_at, file_url, file_name, status) 
              VALUES (?, ?, ?, ?, ?, ?)`,
      params: [assignment_id, student_id, submitted_at, file_url, file_name, status]
    },
    {
      query: `INSERT INTO submissions_by_student 
              (student_id, semester, assignment_id, course_id, title, submitted_at, file_url, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      params: [student_id, semester, assignment_id, course_id, title, submitted_at, file_url, status]
    }
  ];

  await client.batch(queries, { prepare: true });
  return { submitted_at, status };
};

const gradeAssignment = async ({ assignment_id, student_id, course_id, semester, score, feedback, graded_by, submitted_at, file_url, title }) => {
  const graded_at = new Date();
  
  const queries = [
    {
      query: `UPDATE submissions_by_assignment SET score = ?, feedback = ?, status = 'graded', graded_by = ?, graded_at = ?
              WHERE assignment_id = ? AND student_id = ?`,
      params: [score, feedback, graded_by, graded_at, assignment_id, student_id]
    },
    {
      query: `UPDATE submissions_by_student SET score = ?, status = 'graded'
              WHERE student_id = ? AND semester = ? AND assignment_id = ?`,
      params: [score, student_id, semester, assignment_id]
    }
  ];

  await client.batch(queries, { prepare: true });
};

module.exports = {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentDetails,
  submitAssignment,
  gradeAssignment
};
