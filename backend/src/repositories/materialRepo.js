const client = require('../config/cassandra');
const { types } = require('cassandra-driver');

const saveMaterialMetadata = async (material) => {
  const query = 'INSERT INTO materials_by_course (course_id, semester, material_id, file_url, title, type, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [
    material.course_id,
    material.semester,
    types.TimeUuid.now(),
    material.file_url,
    material.title,
    material.type,
    material.uploaded_by
  ];
  await client.execute(query, params, { prepare: true });
  return { material_id: params[2], ...material };
};

const getMaterialsByCourse = async (course_id, semester) => {
  const query = 'SELECT * FROM materials_by_course WHERE course_id = ? AND semester = ?';
  const result = await client.execute(query, [course_id, semester], { prepare: true });
  return result.rows;
};

module.exports = {
  saveMaterialMetadata,
  getMaterialsByCourse
};
